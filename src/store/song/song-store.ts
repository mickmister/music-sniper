import axios from 'axios'
import {Howl, Howler} from 'howler'
import {effect} from 'easy-peasy'

import {AudioFile} from '../../types/music-types'
import {SongChooserHookState, SongChooserHookActions} from './song-store.types'
import SongLoader from '../../services/song-loader'


const uploadFile = async (state: SongChooserHookState, dispatch: any) => {
  const {selectedFile} = state
  if (!selectedFile) {
    return
  }

  const form = new FormData()
  form.append('audio_file[attached_file]', selectedFile)

  const {data} = await axios.post('audio_files', form, { headers: {'Content-Type': 'multipart/form-data' }})
  dispatch.songs.addSong(data)
}

export const updateFile = (state: SongChooserHookState, file: AudioFile) => {
  const files = state.audioFiles
  const index = files.findIndex(f => file.id === f.id)
  files[index] = {
    ...files[index],
    ...file,
  }
}

const loader = new SongLoader()
const playFile = async (state: SongChooserHookState, dispatch: any, file: AudioFile) => {

  // pause all other files
  state.audioFiles.forEach((f: AudioFile) => {
    if (f.howl && f.id !== file.id && f.playing) {
      pause(f.howl)
      dispatch.songs.updateFile({...f, playing: false})
    }
  })

  if (file.loading) {
    return
  }

  // play if existing
  if (file.howl) {
    play(file.howl)
    const updatedFile = {...file, loading: false, playing: true}
    dispatch.songs.updateFile(updatedFile)
    return
  }

  //load file
  const loadingFile = {...file, loading: true}
  dispatch.songs.updateFile(loadingFile)

  const blobUrl = await loader.fetch(file.url)
  const howl = new Howl({src: blobUrl, format: 'mp3'})

  // play new file
  const playingFile = {...file, howl, loading: false, playing: true}
  dispatch.songs.updateFile(playingFile)
  play(howl)
}

const play = (howl: Howl) => setTimeout(() => howl.play(), 0)
const pause = (howl: Howl) => setTimeout(() => howl.pause(), 0)

const pauseFile = (state: SongChooserHookState, dispatch: any, file: AudioFile) => {
  if (!file.howl) {
    return state
  }

  const updatedFile = {...file, playing: false}
  dispatch.songs.updateFile(updatedFile)

  pause(file.howl)
}

const fetchAudioFiles = async (dispatch: any) => {
  const res = await axios.get('/audio_files', {onDownloadProgress: console.log})
  dispatch.songs.addSongs(res.data)
}

type ISongStore = SongChooserHookState & SongChooserHookActions

const SongStore: ISongStore = {
  audioFiles: [],
  selectedFile: null,
  fetchAudioFiles: effect(fetchAudioFiles),
  addAudioFileToCollection: (state: SongChooserHookState, audio_file: AudioFile) => {
    state.audioFiles.push(audio_file)
  },
  addSongs: (state: SongChooserHookState, songs: AudioFile[]) => {
    state.audioFiles = state.audioFiles.concat(songs)
  },
  uploadFile: effect((dispatch: any, _: any, getState: any) => {
    uploadFile(getState().songs, dispatch)
  }),
  selectUploadFile: (state: SongChooserHookState, file: File) => {
    state.selectedFile = file
  },
  playFile: effect((dispatch: any, file: AudioFile, getState: any) => {
    const state = getState().songs
    playFile(state, dispatch, file)
  }),
  pauseFile: effect((dispatch: any, file: AudioFile, getState: any) => {
    const state = getState().songs
    return pauseFile(state, dispatch, file)
  }),
  updateFile,
}

export default SongStore
