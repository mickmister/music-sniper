import Rx from 'rx';

let midi
let data

export const init = async () => {
  if (navigator.requestMIDIAccess) {
    let midi
    try {
      midi = await navigator.requestMIDIAccess({
        sysex: false,
      })
    }
    catch (e) {
      onMIDIFailure(e)
      alert("No MIDI support in your browser.")
      throw e
    }
    return onMIDISuccess(midi)
  }
}

function onMIDISuccess(midi) {
    const {outputs, inputs} = midi

    const inputsArray = []
    const inputValues = inputs.values()
    for (let input = inputValues.next(); input && !input.done; input = inputValues.next()) {
      const inputObservable = Rx.Observable.create(observer => {
        input.value.onmidimessage = msg => observer.OnNext(msg)
      })
      inputsArray.push(inputObservable)
    }

    const outputsArray = []
    for (let output of outputs.values()) {
      outputsArray.push(output)
    }

    return {
      inputs: inputsArray,
      outputs: outputsArray,
    }
}

function onMIDIFailure(error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error)
}

function onMIDIMessage(message) {
    const data = message.data
    console.log('MIDI data', data)
}

const C = 60
const E = 64
const G = 67
const CMajor = [C, E, G]
const F = 65
const A = 69
const FMajor = [C, F, A]

function playCMajor() {
  playChord(CMajor)
}

function playFMajor() {
  playChord(FMajor)
}

let currentChord = null
function playChord(notes) {
  if (currentChord) {
    stopChord(currentChord)
  }
  currentChord = notes
  juno = outputsArray[0]
  notes.forEach(note => juno.send( [ 0x90, note, 1 ] ))
}

function stopChord(notes=currentChord) {
  juno = outputsArray[0]
  notes.forEach(note => juno.send( [ 0x90, note, 0 ] ))
}
