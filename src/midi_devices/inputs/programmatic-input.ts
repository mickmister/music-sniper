import {BehaviorSubject} from 'rxjs'
import {InputDevice, InputMessage} from '../interfaces'
import {Note} from '../../model-interfaces'

export default class ProgrammaticInput implements InputDevice {
  heldDownNotes: Array<Note> = []
  observable: BehaviorSubject<Array<Note>> = new BehaviorSubject<Array<Note>>([])

  getName() {
    return 'Programmatic Input'
  }

  setCurrentlyHeldDownNotes(notes: Array<Note>) {
    this.heldDownNotes = notes
    this.observable.next(notes)
  }

  getCurrentlyHeldDownNotes(): Array<Note> {
    return this.heldDownNotes
  }
}
