import {IStringTMap} from '../util/interfaces'
import {InputDevice, OutputDevice} from '../midi_devices/interfaces'
import {Chord, Note} from '../model-interfaces'
import {ApplicationModeProcessor} from './interfaces'

export default class PlaybackModeProcessor implements ApplicationModeProcessor {
  private currentChord: Chord
  private chords: Array<Chord>
  constructor(private output: OutputDevice) {
    // this.currentChord = chords.length && chords[0]
  }

  setChords(chords: Array<Chord>) {
    this.chords = chords
    if (!this.currentChord) {
      this.currentChord = chords[0]
    }
  }

  playCurrentChord(): void {
    this.output.playChord(this.currentChord)
  }

  playChord() {
    this.output.playChord(this.currentChord)
  }

  stopPlaying() {
    this.output.stopAllVoices()
  }

  gotoNextChord(): void {
    if (!(this.chords.length && this.currentChord)) return

    const index = this.chords.indexOf(this.currentChord)
    const newIndex = (index + 1) % this.chords.length
    this.currentChord = this.chords[newIndex]

    this.playCurrentChord()
  }

  getChords(): Array<Chord> {
    return this.chords
  }
}
