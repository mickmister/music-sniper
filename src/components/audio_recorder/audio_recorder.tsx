import React, {useState, useCallback, useEffect} from 'react'
// import { ReactMic } from 'react-mic'
// import Recorder from 'react-recorder'
import Recorder from './recorder'
import { Actions, useStoreActions } from 'easy-peasy';
import { IGlobalStore } from '../../store/store-types';

export default function AudioRecorder {

  const [recording, setRecording] = useState(false);
  const [nextStateRecording, setNextStateRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [blob, setBlob] = useState(null);

  const uploadFile = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.songs.uploadFile)

  const upload = () => {
    blob.lastModifiedDate = new Date()
    blob.name = 'myfile.wav'
    uploadFile(blob)
  }

  const startRecording = () => {
    setNextStateRecording(false);
    setRecording(false);
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      // .then(handleSuccess);
  }

  const stopRecording = () => {
    setNextStateRecording(false);
  }

  const onData = (recordedBlob: string) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    setBlob(recordedBlob)
    setBlobURL(URL.createObjectURL(recordedBlob))
  }

  const onChange = (e) => {
    const file = e.target.files[0];
    setBlobURL(file);
  };

  const handleSuccess = (stream) => {
    const options = {mimeType: 'audio/webm'};
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }

      if(!nextStateRecording && recording) {
        mediaRecorder.stop();
        setRecording(false);
      }
    });

    mediaRecorder.addEventListener('stop', function() {
      setBlobURL(URL.createObjectURL(new Blob(recordedChunks)))
    });

    mediaRecorder.start();
  };

  return (
    <div>
      {/** <ReactMic
        record={record}
        className="sound-wave"
        onStop={useCallback(onStop)}
        onData={useCallback(onData)}
        strokeColor="#000000"
        backgroundColor="#FF4081" />**/}
        <div style={{marginBottom: '400px'}}>
        <Recorder onStop={onStop} />
        </div>
        { /** <button onClick={useCallback(startRecording)} type="button">Start</button>
        <button onClick={useCallback(stopRecording)} type="button">Stop</button>
      <input onChange={onChange} type="file" accept="audio/*" capture id="recorder" /> **/}
      <div>
        <audio
          // ref="audioSource"
          controls
          src={blobURL}
        />
        <button onClick={upload}>Upload</button>
      </div>
    </div>
  )
}
