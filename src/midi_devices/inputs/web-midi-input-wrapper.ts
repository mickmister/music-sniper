import {Observable} from 'Rx'
import {InputDevice, InputMessage, Note, WebMidiInput, MidiEvent} from '../interfaces'

export default class WebMidiInputWrapper implements InputDevice {
  heldDownNotes: Array<Note> = []
  observable: Observable<Array<Note>>
  observer: any

  constructor(private webMidiInput: WebMidiInput) {
    webMidiInput.addListener('noteon', 'all', e => this.noteOn(e))
    webMidiInput.addListener('noteoff', 'all', e => this.noteOff(e))

    this.observable = Observable.create((observer: any) => {
      this.observer = observer
    })
  }

  getCurrentlyHeldDownNotes(): Array<Note> {
    return this.heldDownNotes
  }

  noteOff(e: MidiEvent) {
    console.log(e)
    const targetNoteNumber = e.note.number
    const arrayMember = this.heldDownNotes.find(note => note.number === targetNoteNumber)
    this.heldDownNotes.splice(this.heldDownNotes.indexOf(arrayMember), 1)
    // this.observer.next([...this.heldDownNotes])
  }

  noteOn(e: MidiEvent) {
    console.log(e)
    this.heldDownNotes.push(e.note)
    //this.observer.next([...this.heldDownNotes])
  }

  destroy() {
    this.webMidiInput.removeListener()
  }

  getName() {
    return this.webMidiInput.name
  }
}
