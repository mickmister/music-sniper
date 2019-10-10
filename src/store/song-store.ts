import axios from 'axios'
import {Howl, Howler} from 'howler'
import {thunk, computed, action} from 'easy-peasy'

import {AudioFile} from '../types/music-types'
import {SongChooserHookState, SongChooserHookActions, DispatchSongChooserActions} from './song-store.types'


const uploadFile = async (selectedFile: File, dispatch: DispatchSongChooserActions) => {
  if (!selectedFile) {
    return
  }

  const form = new FormData()
  form.append('audio_file[attached_file]', selectedFile)

  const {data} = await axios.post('audio_files', form, { headers: {'Content-Type': 'multipart/form-data' }})
  dispatch.addSongs([data])
  return data
}

export const updateFile = (state: SongChooserHookState, file: AudioFile) => {
  const files = state.audioFiles
  const index = files.findIndex(f => file.id === f.id)
  files[index] = {
    ...files[index],
    ...file,
  }
}

const playFile = async (state: SongChooserHookState, dispatch: DispatchSongChooserActions, file: AudioFile) => {

  // pause all other files
  state.audioFiles.forEach((f: AudioFile) => {
    if (f.id !== file.id && f.howl && f.playing) {
      pause(f.howl)
      dispatch.updateFile({...f, playing: false})
    }
  })

  if (file.loading) {
    return
  }

  // play if existing
  if (file.howl) {
    play(file.howl)
    const updatedFile = {...file, loading: false, playing: true}
    dispatch.updateFile(updatedFile)
    return
  }

  //load file
  const howl = new Howl({src: file.url, format: 'mp3', html5: true})
  const loadingFile = {...file, howl, loading: true}
  dispatch.updateFile(loadingFile)

  howl.on('load', () => {
    play(howl)
    const playingFile = {...file, loading: false, playing: true}
    dispatch.updateFile(playingFile)
  })

  howl.on('loaderror', () => {
    const errorFile = {...file, loading: false, error: 'Failed to fetch/load file'}
    dispatch.updateFile(errorFile)
  })

  if(howl.state() === 'loaded') {
    play(howl)
    const playingFile = {...file, loading: false, playing: true}
    dispatch.updateFile(playingFile)
  }
}

const play = (howl: Howl) => setTimeout(() => howl.play(), 0)
const pause = (howl: Howl) => setTimeout(() => howl.pause(), 0)

const pauseFile = (state: SongChooserHookState, dispatch: DispatchSongChooserActions, file: AudioFile) => {
  if (!file.howl) {
    return state
  }

  const updatedFile = {...file, playing: false}
  dispatch.updateFile(updatedFile)

  pause(file.howl)
}

const fetchAudioFiles = async (dispatch: DispatchSongChooserActions) => {
  const {data} = await axios.get('/audio_files', {onDownloadProgress: console.log})
  if (data) {
    dispatch.addSongs(data)
  }
}

type ISongStore = SongChooserHookState & SongChooserHookActions

const SongStore: ISongStore = {
  audioFiles: [],
  selectedFile: null,
  currentPlayingSongId: null,
  fetchAudioFiles: thunk(fetchAudioFiles),
  updateFile,

  setCurrentPlayingSong: (state, audioFile) => {
    state.currentPlayingSongId = audioFile.id
  },

  currentPlayingSong: computed((state: SongChooserHookState) => {
    const id = state.currentPlayingSongId
    if (!id) {
      return null
    }

    return state.audioFiles.find(file => file.id === id)
  }),

  addAudioFileToCollection: action((state: SongChooserHookState, audio_file: AudioFile) => {
    state.audioFiles.push(audio_file)
  }),

  addSongs: action((state: SongChooserHookState, songs: AudioFile[]) => {
    state.audioFiles = state.audioFiles.concat(songs)
  }),

  uploadFile: thunk((dispatch: DispatchSongChooserActions, file: File) => {
    return uploadFile(file, dispatch)
  }),

  playFile: thunk((dispatch: DispatchSongChooserActions, audioFile: AudioFile, getState: any) => {
    const state = getState().songs
    playFile(state, dispatch, audioFile)
  }),

  pauseFile: thunk((dispatch: DispatchSongChooserActions, audioFile: AudioFile, getState: any) => {
    const state = getState().songs
    return pauseFile(state, dispatch, audioFile)
  }),

  playingInfo: {

  },
  songsWithPlayingInfo: computed(() => {

  }),
}

export default SongStore
