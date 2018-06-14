import {IStringTMap} from '../util/interfaces'
import {InputDevice} from '../midi_devices/interfaces'
import {Chord, Note} from '../model-interfaces'
import {ApplicationModeProcessor} from './interfaces'

export default class RecordingModeProcessor implements ApplicationModeProcessor {
  chords: Array<Chord> = []
  constructor(private input: InputDevice) {

  }

  saveChord(): Chord {
    return this.saveCurrentChord()
  }

  undoLastChord(): void {
    if (this.chords.length) {
      this.chords.pop()
    }
  }

  stopRecording(): void {
    const notes = this.input.getCurrentlyHeldDownNotes()
    if (notes.length) {
      this.saveCurrentChord()
    }
  }

  getChords(): Array<Chord> {
    return this.chords
  }

  private saveCurrentChord() {
    const notes = this.input.getCurrentlyHeldDownNotes()
    const chord = {notes: [...notes]}
    this.chords.push(chord)
    return chord
  }
}
