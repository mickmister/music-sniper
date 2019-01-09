import axios from 'axios'
import {Howl, Howler} from 'howler'

import {AudioFile} from '../types/music-types'
import { SongChooserHookState, SongChooserHookActions, defaultState, withCallback } from './song-chooser-hook.types'
import SongLoader from '../services/song-loader'

async function componentDidMount(setState: withCallback) {
  const audioFiles = await fetchAudioFiles()
  setState((state: SongChooserHookState) => {
    return {...state, audioFiles}
  })
}

async function fetchAudioFiles() {
  const res = await axios.get('/audio_files', {onDownloadProgress: console.log})
  return res.data
}

function addAudioFileToCollection(audioFile: AudioFile, state: SongChooserHookState): SongChooserHookState {
  const audioFiles = [...state.audioFiles, audioFile]
  return {
    ...state,
    audioFiles,
  }
}

const selectUploadFile = (file: File, state: SongChooserHookState) => {
  return {
    ...state,
    selectedFile: file,
  }
}

const uploadFile = (setState: withCallback) => {
  setState((state: SongChooserHookState) => {

    const {selectedFile} = state
    if (!selectedFile) {
      return state
    }

    const form = new FormData()
    form.append('audio_file[attached_file]', selectedFile)
    axios.post('audio_files', form, { headers: {'Content-Type': 'multipart/form-data' }})
    .then(res => {
      setState((state: SongChooserHookState) => ({
        ...state,
        audioFiles: [...state.audioFiles, res.data],
      }))
    })

    return state
  })
}

export const updateFile = (file: AudioFile, setState: withCallback) => {
  setState(state => {
    const files = [...state.audioFiles]
    files.splice(files.findIndex(f => file.id === f.id), 1, file)
    return {
      ...state,
      audioFiles: files,
    }
  })
}

const loader = new SongLoader()
const playFile = async (file: AudioFile, state: SongChooserHookState, setState: withCallback) => {

  // pause all other files
  state.audioFiles.forEach((f: AudioFile) => {
    if (f.howl && f.id !== file.id) {
      pause(f.howl)
      updateFile({...f, playing: false}, setState)
    }
  })

  if (file.loading) {
    return
  }

  // play if existing
  if (file.howl) {
    play(file.howl)
    const updatedFile = {...file, loading: false, playing: true}
    updateFile(updatedFile, setState)
    return
  }

  //load file
  const loadingFile = {...file, loading: true}
  updateFile(loadingFile, setState)
  const blobUrl = await loader.fetch(file.url)
  const howl = new Howl({src: blobUrl, format: 'mp3'})

  // play new file
  const playingFile = {...file, howl, loading: false, playing: true}
  updateFile(playingFile, setState)
  play(howl)
}

const play = (howl: Howl) => setTimeout(() => howl.play(), 0)
const pause = (howl: Howl) => setTimeout(() => howl.pause(), 0)

const pauseFile = (file: AudioFile, state: SongChooserHookState) => {
  if (!file.howl) {
    return state
  }
  const updatedFile = {...file, playing: false}
  const files = [...state.audioFiles]
  files.splice(files.findIndex(f => file.id === f.id), 1, updatedFile)
  pause(file.howl)

  return {
    ...state,
    audioFiles: files,
  }
}

type Hooks = {
  useState: any,
  useEffect: any,
}

export function useSongChooserHook (initialState: SongChooserHookState, hooks: Hooks): [SongChooserHookState, SongChooserHookActions] {
  const [state, setState] = hooks.useState(initialState || defaultState) as [SongChooserHookState, withCallback]

  hooks.useEffect(() => {
    componentDidMount(setState)
  }, [])

  const actions = {
    addAudioFileToCollection: (audio_file: AudioFile) => setState((state: SongChooserHookState) => {
      return addAudioFileToCollection(audio_file, state)
    }),
    uploadFile: () => uploadFile(setState),
    selectUploadFile: (file: File) => setState((state: SongChooserHookState) => {
      return selectUploadFile(file, state)
    }),
    playFile: (file: AudioFile) => setState(state => {
      playFile(file, state, setState)
      return state
    }),
    pauseFile: (file: AudioFile) => setState(state => {
      return pauseFile(file, state)
    }),
  } as SongChooserHookActions

  return [state, actions]
}
