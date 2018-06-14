import React from 'react'
import {InputDevice} from './midi_devices/interfaces'
import {Chord, Note} from './model-interfaces'

interface IProps {
  input: InputDevice
  heldDownNotes: Array<Note>
}

export default class ActiveInputDevice extends React.Component<IProps> {

  render() {
    const {input, heldDownNotes} = this.props
    return (
      <div>
        <h2>Active Input</h2>
        {input.getName()}
        {heldDownNotes.map((note: Note) => (
          <pre>{JSON.stringify(note, null, 2)}</pre>
        ))}
      </div>
    )
  }
}
