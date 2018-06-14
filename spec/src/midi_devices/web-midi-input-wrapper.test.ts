import * as mocha from 'mocha'
import * as chai from 'chai'

import WebMidiInputWrapper from '../../../src/midi_devices/inputs/web-midi-input-wrapper'
import MockMidiInputDevice from './mock-midi-input-device'

const expect = chai.expect
describe('WebMidiInputWrapper', () => {

  beforeEach(() => {
    this.mockMidiInput = new MockMidiInputDevice()
    this.input = new WebMidiInputWrapper(this.mockMidiInput)
  })

  it('it should return the notes that have been sent with the mock input', () => {
    expect(this.input.getCurrentlyHeldDownNotes().length).to.eq(0)

    const noteToSend = {number: 84, name: 'C', octave: 4}

    this.mockMidiInput.sendNoteOn(noteToSend)
    console.log(this.input.getCurrentlyHeldDownNotes())
    expect(this.input.getCurrentlyHeldDownNotes().length).to.equal(1)
    expect(this.input.getCurrentlyHeldDownNotes()[0]).to.equal(noteToSend)
    this.mockMidiInput.sendNoteOff(noteToSend)
    expect(this.input.getCurrentlyHeldDownNotes().length).to.equal(0)
  })
})
