import React, { useEffect, useState } from 'react'

var sampleRate = 44100;
var blob = null;

const connectAudio = ({setAudioNode, setDuration, setRecording, setFileData}) => {
  var leftchannel = [];
  var rightchannel = [];
  var recordingLength = 0;
    try {
   // Initialize recorder
   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
   navigator.getUserMedia(
   {
       audio: true
   },
   function (e) {
     try {
      console.log("user consent");
      // creates the audio context
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      // creates an audio node from the microphone incoming stream
      const mediaStream = context.createMediaStreamSource(e);
      // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor
      // bufferSize: the onaudioprocess event is called when the buffer is full
      var bufferSize = 2048;
      var numberOfInputChannels = 2;
      var numberOfOutputChannels = 2;

      let recorder
      if (context.createScriptProcessor) {
          recorder = context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
      } else {
          recorder = context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels);
      }

      let duration = 0
      let startDate = new Date()
      recorder.onaudioprocess = function (e) {
          leftchannel.push(new Float32Array(e.inputBuffer.getChannelData(0)));
          rightchannel.push(new Float32Array(e.inputBuffer.getChannelData(1)));
          recordingLength += bufferSize;
          duration = new Date().getTime() - startDate.getTime();
          setDuration(duration)
          setFileData({leftchannel, rightchannel, recordingLength})
      }
      // we connect the recorder
      mediaStream.connect(recorder);
      recorder.connect(context.destination);

      setRecording(true)
      setAudioNode({mediaStream, recorder, context})
    } catch (e) {
      alert(e)
    }
   },
    function (e) {
        console.error(e);
        alert(e)
    });
  } catch (e) {
    alert(e)
  }

  // return audioNode
}

const Recorder : React.FC<{}> = (props) => {
  const [recording, setRecording] = useState(false)
  const [audioNode, setAudioNode] = useState(null)
  const [duration, setDuration] = useState(0)
  const [fileData, setFileData] = useState([])
  const [fileSource, setFileSource] = useState([])

  const start = () => {
    connectAudio({setAudioNode, setDuration, setRecording, setFileData})
  }

  const stop = () => {
    const {context, mediaStream, recorder} = audioNode
    const {leftchannel, rightchannel, recordingLength} = fileData
    // stop recording
    recorder.disconnect(context.destination);
    mediaStream.disconnect(recorder);
    console.log(audioNode)
    setAudioNode(null)
    setRecording(false)

    // we flat the left and right channels down
    // Float32Array[] => Float32Array
    var leftBuffer = flattenArray(leftchannel, recordingLength);
    var rightBuffer = flattenArray(rightchannel, recordingLength);
    // we interleave both channels together
    // [left[0],right[0],left[1],right[1],...]
    var interleaved = interleave(leftBuffer, rightBuffer);
    // we create our wav file
    var buffer = new ArrayBuffer(44 + interleaved.length * 2);
    var view = new DataView(buffer);
    // RIFF chunk descriptor
    writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 44 + interleaved.length * 2, true);
    writeUTFBytes(view, 8, 'WAVE');
    // FMT sub-chunk
    writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // chunkSize
    view.setUint16(20, 1, true); // wFormatTag
    view.setUint16(22, 2, true); // wChannels: stereo (2 channels)
    view.setUint32(24, sampleRate, true); // dwSamplesPerSec
    view.setUint32(28, sampleRate * 4, true); // dwAvgBytesPerSec
    view.setUint16(32, 4, true); // wBlockAlign
    view.setUint16(34, 16, true); // wBitsPerSample
    // data sub-chunk
    writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);
    // write the PCM samples
    var index = 44;
    var volume = 1;
    for (var i = 0; i < interleaved.length; i++) {
        view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
        index += 2;
    }
    // our final blob
    blob = new Blob([view], { type: 'audio/wav' });
    props.onStop(blob)
  }

  return (
    <div style={{color: 'yellow'}}>
      {Math.floor(duration / 1000)}
      {recording ? (
        <button onClick={stop}>stop</button>
      ) : (
        <button onClick={start}>start</button>
      )}
    </div>
  )
}

function flattenArray(channelBuffer, recordingLength) {
  var result = new Float32Array(recordingLength);
  var offset = 0;
  for (var i = 0; i < channelBuffer.length; i++) {
      var buffer = channelBuffer[i];
      result.set(buffer, offset);
      offset += buffer.length;
  }
  return result;
}
function interleave(leftChannel, rightChannel) {
  var length = leftChannel.length + rightChannel.length;
  var result = new Float32Array(length);
  var inputIndex = 0;
  for (var index = 0; index < length;) {
      result[index++] = leftChannel[inputIndex];
      result[index++] = rightChannel[inputIndex];
      inputIndex++;
  }
  return result;
}
function writeUTFBytes(view, offset, string) {
  for (var i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
  }
}

export default Recorder
