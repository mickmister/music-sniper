import * as mocha from 'mocha'
import * as chai from 'chai'

import ProgrammaticInput from '../../../src/midi_devices/inputs/programmatic-input'

const expect = chai.expect
describe('ProgrammaticInput', () => {

  beforeEach(() => {
    this.input = new ProgrammaticInput()
  })

  it('it should return the notes that are assigned to it', () => {
    const notes = [{b: 3}]
    this.input.setCurrentHeldDownNotes(notes)
    expect(this.input.getCurrentlyHeldDownNotes()).to.equal(notes)
  })
})
