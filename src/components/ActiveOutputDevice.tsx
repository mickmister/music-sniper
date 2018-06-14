import React from 'react'
import {IStringTMap} from '../util/interfaces'
import {OutputDevice} from '../midi_devices/interfaces'
import {Chord, Note} from '../model-interfaces'

interface IProps {
  output: OutputDevice
}

export default class ActiveOutputDevice extends React.Component<IProps> {
  render() {
    const {output} = this.props
    return (
      <div>
        <h2>Active Output</h2>
        {output.getName()}
      </div>
    )
  }
}
