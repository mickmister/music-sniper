import axios, { AxiosResponse } from 'axios'
import {Howl, Howler} from 'howler'
import {thunk, computed, action} from 'easy-peasy'

import {AudioFile, Project, Clip, Percentage} from '../types/music-types'
import {SongChooserHookState, DispatchSongChooserActions} from './song-store.types'
import {ISongStore} from './store-types'
import { createOrUpdateEntity, storeEntities } from './shared-store-logic'
import { Section } from '../types/music-types'
import { StaticSprite } from '../music-processing/static-sprite'
import { SpriteContainer } from '../music-processing/sprite-container'

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

const play = (howl: Howl, name?: string) => setTimeout(() => howl.play(name), 0)
const pause = (howl: Howl) => setTimeout(() => howl.pause(), 0)

const pauseFile = (state: SongChooserHookState, dispatch: DispatchSongChooserActions, file: AudioFile) => {
  if (!file.howl) {
    return state
  }

  const updatedFile = {...file, playing: false}
  dispatch.updateFile(updatedFile)

  pause(file.howl)
}

const fetchAudioFiles = async (dispatch) => {
  const {data} = await axios.get('/audio_files', {onDownloadProgress: console.log})
  if (data) {
    dispatch.addSongs(data)
  }
}

// type ISongStore = SongChooserHookState & SongChooserHookActions

const SongStore: ISongStore = {
  audioFiles: [],
  selectedFile: null,
  currentPlayingSongId: null,
  activeSpriteInfo: null,

  fetchAudioFiles: thunk(async (actions) => {
    const {data} = await axios.get('/audio_files', {onDownloadProgress: console.log})
    if (data) {
      actions.addSongs(data)
    }
  }),
  updateFile: action((state, file) => {
    const files = state.audioFiles
    const index = files.findIndex(f => file.id === f.id)
    files[index] = {
      ...files[index],
      ...file,
    }
  }),

  setCurrentPlayingSong: action((state, audioFile) => {
    state.currentPlayingSongId = audioFile.id
  }),

  currentPlayingSong: computed((state) => {
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

  uploadFile: thunk(async (actions, file) => {
    if (!file) {
      return
    }

    const form = new FormData()
    form.append('audio_file[attached_file]', file)

    const {data} = await axios.post('audio_files', form, { headers: {'Content-Type': 'multipart/form-data' }})
    actions.addSongs([data])
    return data
  }),

  playFile: thunk((actions, audioFile, {getState}) => {
    const state = getState()
    playFile(state, actions, audioFile)
  }),

  pauseFile: thunk((actions, audioFile, {getState}) => {
    const state = getState()
    return pauseFile(state, actions, audioFile)
  }),

  clips: [],
  storeClips: action((state, clips) => {
    storeEntities(state.clips, clips)
  }),

  createOrUpdateClip: thunk(async (actions, clip) => {
    const res = (await createOrUpdateEntity('clips', clip)) as AxiosResponse<Clip>

    actions.storeClips([res.data])
    actions.addClipToAudioFile(res.data)
    return res
  }),

  addClipToAudioFile: action((state, clip) => {
    const file = state.audioFiles.find(f => f.id === clip.audio_file_id)
    const index = file.clip_ids.indexOf(clip.id)
    if (index === -1) {
      file.clip_ids.push(clip.id)
    }
  }),

  fetchClips: thunk(async (dispatch, audioFileId) => {
    const {data} = await axios.get('/clips', {params: {audio_file_id: audioFileId}})

    if (data) {
      dispatch.storeClips(data)
    }
    return data
  }),

  updateActiveSpriteInfo: action((state, spriteInfo) => {
    state.activeSpriteInfo = spriteInfo
  }),

  activeSpriteContainer: null,
  setActiveSpriteContainer: action((state, sprite) => {
    state.activeSpriteContainer = sprite
  }),

  playClip: thunk((dispatch, clip, {getState}) => {
    const state = getState()
    const file = state.audioFiles.find(f => f.id === clip.audio_file_id)
    const activeSpriteContainer = state.activeSpriteContainer
    if (activeSpriteContainer) {
      const activeSprite = activeSpriteContainer.sprite
      debugger
      if (activeSprite.section === clip) {
        if (activeSprite.getSpriteInfo().playing) {
          activeSprite.pause()
        } else {
          activeSprite.play()
        }
        return
      }
      activeSpriteContainer.sprite.stop()
      activeSpriteContainer.cleanUp()
    }
    const sprite = new StaticSprite(file.url, clip)
    const container = new SpriteContainer(sprite, [clip])
    // sprite.howl.volume(0)
    sprite.play()
    // sprite.howl.volume(0)
    // setTimeout(() => sprite.howl.mute(), 100)
    container.getObsvervableForInterval().subscribe(spriteInfo => {
      dispatch.updateActiveSpriteInfo(spriteInfo)
    })
    dispatch.setActiveSpriteContainer(container)
  }),

  seekActiveSprite: action((state, seekValue: Percentage) => {
    if (!state.activeSpriteContainer) {
      return
    }

    state.activeSpriteContainer.sprite.seekPercentage(seekValue / 100.0)
  }),
}

/*
playClip: action((state, clip) => {
    const file = state.audioFiles.find(f => f.id === clip.audio_file_id)
    const howl = new Howl({
      src: file.url,
      format: 'mp3',
      html5: true,
      sprite: {
        playme: [clip.start * 1000, (clip.end - clip.start) * 1000]
      },
    })
    // const loadingFile = {...file, howl, loading: true}
    // dispatch.updateFile(loadingFile)

    howl.on('load', () => {
      play(howl, 'playme')
      // const playingFile = {...file, loading: false, playing: true}
      // dispatch.updateFile(playingFile)
    })

    howl.on('loaderror', () => {
      // const errorFile = {...file, loading: false, error: 'Failed to fetch/load file'}
      // dispatch.updateFile(errorFile)
    })

    if(howl.state() === 'loaded') {
      play(howl, 'playme')
      // const playingFile = {...file, loading: false, playing: true}
      // dispatch.updateFile(playingFile)
    }
  }),

  // playingInfo: {

  // },
  // songsWithPlayingInfo: computed(() => {

  // }),
*/

export default SongStore
