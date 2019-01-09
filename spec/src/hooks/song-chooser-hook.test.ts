import React from 'react'
import sinon from 'sinon'
import * as mocha from 'mocha'
import chai from 'chai'

import * as SongChooserHook from '../../../src/hooks/song-chooser-hook'


const expect = chai.expect
describe('ProgressionHook', () => {
  let state
  let useState
  let returnedState
  let fakeSetState
  let setState

  beforeEach(() => {
    state = {chords: []}
    returnedState = null

    fakeSetState = (fn => {
      returnedState = fn(state)
    })
    setState = sinon.spy(fakeSetState)
    useState = () => [state, setState]
  })

  describe('updateFile', () => {
    it('update a file', () => {
      const hook = SongChooserHook.useSongChooserHook(state, {useState})
      expect(hook[0]).to.deep.equal(state)
      expect(setState).not.to.have.been.called

      const chord = createChord()
      hook[1].addChordToProgression(chord)
      expect(setState).to.have.been.called
      expect(returnedState).to.deep.equal({chords: [chord], initialized: true})
    })
  })

  describe('incoming websocket messages', () => {
    it('should update its chords when an updateProgression websocket message comes in', () => {
      const ioOnSpy = sinon.spy()
      const socket = {on: ioOnSpy}
      const useContext = () => ({state: {socket}, actions: {}})

      const hook = ProgressionHook.useProgressionHook({chords: []}, {useState, useContext})
      const socketCallback = ioOnSpy.args[0][1] as any
      console.log(ioOnSpy.args)

      const chord = createChord()
      socketCallback({type: 'updateProgression', data: [chord]})

      expect(setState).to.have.been.called
      expect(returnedState).to.deep.equal({chords: [chord], initialized: true})
    })
  })
})
