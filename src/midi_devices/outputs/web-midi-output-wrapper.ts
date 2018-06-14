import {OutputDevice, OutputMessage, WebMidiOutput, MidiEvent} from '../interfaces'
import {Chord, Note} from '../../model-interfaces'

export default class WebMidiOutputWrapper implements OutputDevice {
  currentChord: Chord
  constructor(private webMidiOutput: WebMidiOutput) {
  }

  getName(): string {
    return this.webMidiOutput.name
  }

  send(msg: OutputMessage) {
  }

  playChord(chord: Chord) {
//     debugger
    const notes = chord.notes.map(n => `${n.name}${n.octave}`)
    this.webMidiOutput.playNote(notes)
    const cur = this.currentChord
    if (this.currentChord) {
      setTimeout(() => {
        cur.notes.forEach(n => {
          if (!chord.notes.find(other => other.number === n.number)) {
            this.webMidiOutput.stopNote(`${n.name}${n.octave}`)
          }
        })
      }, 10)
    }
    this.currentChord = chord
  }

  stopAllVoices() {
    this.webMidiOutput.stopNote('all')
  }
}
