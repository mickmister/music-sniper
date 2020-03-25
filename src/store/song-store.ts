import axios, {AxiosResponse} from 'axios'
import {Howl} from 'howler'
import {thunk, computed, action, Action, Thunk, Computed} from 'easy-peasy'

import {AudioFile, Clip, SpriteInformation, Percentage} from '../types/music-types'

import {StaticSprite} from '../music-processing/static-sprite'
import {SpriteContainer} from '../music-processing/sprite-container'
import {Sprite} from '../music-processing/sprite'

import {createOrUpdateEntity, storeEntities} from './shared-store-logic'
import {IGlobalStore} from './store-types'

export interface ISongStore {
    audioFiles: AudioFile[];
    selectedFile: File | null;
    currentPlayingSongId: number | null;
    currentPlayingSong: Computed<ISongStore>;
    addAudioFileToCollection: Action<ISongStore, AudioFile>;
    uploadFile: Thunk<ISongStore, File>;
    setCurrentPlayingSong: Action<ISongStore, AudioFile>;
    playFile: Thunk<ISongStore, AudioFile>;
    pauseFile: Thunk<ISongStore, AudioFile>;
    fetchAudioFiles: Thunk<ISongStore, void, void, Promise<AudioFile[]>>;
    addSongs: Action<ISongStore, AudioFile[]>;
    updateFile: Action<ISongStore, AudioFile>;
    createOrUpdateClip: Thunk<ISongStore, Clip>;
    clips: Clip[];
    storeClips: Action<ISongStore, Clip[]>;
    addClipToAudioFile: Action<ISongStore, Clip>;
    fetchClips: Thunk<ISongStore, number | void, void, IGlobalStore, Promise<Clip[]>>;
    playClip: Thunk<ISongStore, Clip & {masterPlayer: boolean}, void, IGlobalStore, Promise<Sprite>>;
    forcePlayClip: Thunk<ISongStore, Clip, void, IGlobalStore, Promise<Sprite>>;
    updateActiveSpriteInfo: Action<ISongStore, SpriteInformation>;
    activeSpriteInfo: SpriteInformation;
    seekActiveSprite: Action<ISongStore, Percentage>;
    activeSpriteContainer: SpriteContainer | null;
    setActiveSpriteContainer: Action<ISongStore, SpriteContainer | null>;

    getSelectedAudioFile: Computed<ISongStore, (loc?: {pathname: string}) => (AudioFile | null), IGlobalStore>
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

    if (howl.state() === 'loaded') {
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

const getAudioFileDuration = async (f: File): Promise<number> => {
    const fileURL = URL.createObjectURL(f)
    const howl = new Howl({
        src: [fileURL],
        html5: true,
        format: f.name.split('.').pop().toLowerCase(),
    })

    return new Promise((r) => {
        howl.once('load', () => {
            r(howl.duration())
            howl.unload()
        })
    })
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
        const index = files.findIndex((f) => file.id === f.id)
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

        return state.audioFiles.find((file) => file.id === id)
    }),

    addAudioFileToCollection: action((state: SongChooserHookState, audio_file: AudioFile) => {
        state.audioFiles.push(audio_file)
    }),

    addSongs: action((state: SongChooserHookState, songs: AudioFile[]) => {
        songs.forEach((file) => {
            const index = state.audioFiles.findIndex((f: AudioFile) => f.id === file.id)
            if (index > -1) {
                state.audioFiles[index] = file
            } else {
                state.audioFiles.push(file)
            }
        })
    }),

    uploadFile: thunk(async (actions, file): Promise<AudioFile> => {
        if (!file) {
            return null
        }

        const audioLength = await getAudioFileDuration(file)

        const form = new FormData()
        form.append('audio_file[attached_file]', file)
        form.append('audio_file[audio_length]', audioLength.toString())

        const {data} = await axios.post('audio_files', form, {headers: {'Content-Type': 'multipart/form-data'}})
        actions.addSongs([data])
        return data as AudioFile
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
        const file = state.audioFiles.find((f) => f.id === clip.audio_file_id)
        const index = file.clip_ids.indexOf(clip.id)
        if (index === -1) {
            file.clip_ids.push(clip.id)
        }
    }),

    fetchClips: thunk(async (dispatch, audioFileId) => {
        let params = {}
        if (audioFileId) {
            params = {audio_file_id: audioFileId}
        }
        const {data} = await axios.get('/clips', {params})

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

    forcePlayClip: thunk(async (dispatch, clip) => {
        const sprite = await dispatch.playClip(clip)

        if (sprite) {
            sprite.play()
        }

        return sprite
    }),

    playClip: thunk(async (dispatch, clip, {getState}) => {
        const state = getState()
        const file = state.audioFiles.find((f) => f.id === clip.audio_file_id)
        const activeSpriteContainer = state.activeSpriteContainer
        if (activeSpriteContainer) {
            const activeSprite = activeSpriteContainer.sprite
            if (clip.masterPlayer || (!clip.force && (activeSprite.clip === clip ||
                (activeSprite.clip.id && activeSprite.clip.id === clip.id && activeSprite.clip.updated_at === clip.updated_at) ||
                (activeSprite.clip.start_time === clip.start_time && activeSprite.clip.end_time === clip.end_time)))) {
                if (activeSprite.getSpriteInfo().playing) {
                    activeSprite.pause()
                } else {
                    activeSprite.play()
                }
                return null
            }
            activeSpriteContainer.sprite.stop()
            activeSpriteContainer.cleanUp()
        }
        const sprite = new StaticSprite(file.url, clip)
        const container = new SpriteContainer(sprite, [clip])

        if (clip.end_time === 100000) {
            // clip.end_time = 10000
            setTimeout(() => {
                const length = sprite.howl.duration()
                clip.end_time = length
            }, 1000)
        }

        // sprite.howl.volume(0)
        // sprite.play()

        // sprite.howl.volume(0)
        // setTimeout(() => sprite.howl.mute(), 100)
        container.getObsvervableForInterval().subscribe((spriteInfo) => {
            dispatch.updateActiveSpriteInfo(spriteInfo)
        })
        dispatch.setActiveSpriteContainer(container)
        return sprite
    }),

    seekActiveSprite: action((state, seekValue: Percentage) => {
        if (!state.activeSpriteContainer) {
            return
        }

        state.activeSpriteContainer.sprite.seekPercentage(seekValue / 100.0)
    }),

    getSelectedAudioFile: computed([
        (state) => state.audioFiles,
        (state, storeState) => storeState.sidebars.selectedEntity,
    ], (audioFiles, selectedEntity) => (loc) => {
        loc = loc || location
        if (selectedEntity) {
            return selectedEntity as AudioFile
        }
        const audioFileID = location.pathname.match(/\/songs\/([0-9]*)\/play/)
        if (audioFileID) {
            return audioFiles.find((f) => f.id === parseInt(audioFileID[1], 10))
        }

        return null
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
