import noteToFrequency from 'note-to-frequency'

import {OutputDevice, OutputMessage} from '../interfaces'
import {Chord, Note} from '../../model-interfaces'

export default class SoftwareSynthOutput implements OutputDevice {

  constructor(private synth: any) {

  }

  getName() {
    return 'Software Synth'
  }

  send(msg: OutputMessage) {

  }

  playChord(chord: Chord) {
    this.stopAllVoices()
    const notes = chord.notes
    notes.forEach((note: Note, i: number) => {
      const voice = this.synth.voices[i]
      voice.pitch(noteToFrequency(`${note.name}${note.octave}`))
      voice.start()
    })
  }

  stopAllVoices() {
    this.synth.stop()
  }
}
