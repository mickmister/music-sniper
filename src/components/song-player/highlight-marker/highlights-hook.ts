import {useState} from 'react'

type HighlightState = number[]

type HighlightActions = {
  addHighlight: (highlight: number) => void
}

export const useHighlights = (initialState: HighlightState): [HighlightState, HighlightActions] => {
  const [state, setState] = useState(initialState)
  const addHighlight = (highlight: number) => {
    setState([
      ...state,
      highlight,
    ])
  }

  const actions = {addHighlight}

  return [state, actions]
}
