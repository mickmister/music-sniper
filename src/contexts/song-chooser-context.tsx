import React, {useState, useEffect} from 'react'

import {useSongChooserHook} from '../hooks/song-chooser-hook'
import {SongChooserHookState, SongChooserHookActions} from '../hooks/song-chooser-hook.types'

type Props = {
  value?: SongChooserHookState,
  children: React.ReactNode
}

export type SongChooserContextValue = {
  state: SongChooserHookState,
  actions: SongChooserHookActions,
}

const Context = React.createContext({})
const defaultState: SongChooserHookState = {
  audioFiles: [],
  selectedFile: null,
}

export function SongChooserProvider(props: Props) {
  const [state, actions] = useSongChooserHook(defaultState, {useState, useEffect})

  return (
    <Context.Provider value={{state, actions} as SongChooserContextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default Context
