import {useState, useEffect} from 'react'
import debounce from 'debounce'


export interface DoubleSeekBarContainerProps {
  setBounds: (obj: {}) => {}
}

type sState = ((state: SeekBarState) => void) | any

export interface SeekBarState {
  position: number
  intentPosition: number
  lastTouched: string
  showPopover: boolean
  fullLength: number
  isSeeking: boolean
}

export interface SeekBarActions {
  onSeekStart: (position: number, state: SeekBarState, setState: sState) => void

  onSeekEnd: (position: number, state: SeekBarState, setState: sState) => void

  onIntent: (intentPosition: number, state: SeekBarState, setState: sState) => void

  onSeek: (position: number, state: SeekBarState, setState: sState) => void
}

const TARGETS = {
  SEEK: 'SEEK',
  INTENT: 'INTENT',
}

const INTENT_TIMEOUT = 1000

const performIntentTimeout = debounce((target: string, setState: sState) => {

  setState((state: SeekBarState) => {
    // console.log(state)
    if (state.lastTouched === target) {
      return {...state, showPopover: true}
    }

    return {...state, showPopover: false}
  })
}, INTENT_TIMEOUT)

export const onSeekStart = (position: number, state: SeekBarState, setState: sState) => {
  // console.log(state)
  setState({...state, position, lastTouched: TARGETS.SEEK, showPopover: true, isSeeking: true})
}

export const onSeekEnd = (position: number, state: SeekBarState, setState: sState) => {
  // console.log(state)
  setState({...state, position, lastTouched: TARGETS.SEEK, showPopover: true, isSeeking: false})
  performIntentTimeout(TARGETS.INTENT, setState)
}

export const onIntent = (intentPosition: number, state: SeekBarState, setState: sState) => {
  // console.log(state)
  setState({...state, intentPosition, lastTouched: TARGETS.INTENT, showPopover: true})
  performIntentTimeout(TARGETS.SEEK, setState)
}

export const onSeek = (position: number, state: SeekBarState, setState: sState) => {
  // console.log(state)
  setState({...state, position, lastTouched: TARGETS.SEEK, showPopover: true, isSeeking: true})
}

const defaultState: SeekBarState = {
  showPopover: false,
  position: 0,
  intentPosition: 0,
  lastTouched: '',
  fullLength: 0,
  isSeeking: false,
}

export const useSeekBar = (): [SeekBarState, SeekBarActions] => {
  const initialState: SeekBarState = defaultState
  const [state, setState] = useState(initialState)

  const actions = {
    onSeekStart: (position: number) => onSeekStart(position, state, setState),
    onSeek: (position: number) => onSeek(position, state, setState),
    onSeekEnd: (position: number) => onSeekEnd(position, state, setState),
    onIntent: (intentPosition: number) => onIntent(intentPosition, state, setState),
  }

  return [state, actions]
}

export default {
  onSeekStart,
  onSeek,
  onSeekEnd,
  onIntent,
  useSeekBar,
}
