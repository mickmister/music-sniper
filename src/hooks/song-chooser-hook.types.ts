import {AudioFile} from '../types/music-types'

export interface SongChooserHookState {
  audioFiles: AudioFile[],
  selectedFile: File | null,
}

export interface SongChooserHookActions {
  addAudioFileToCollection: (audio_file: AudioFile) => void,
  uploadFile: () => void,
  selectUploadFile: (file: File) => void,
  playFile: (file: AudioFile) => void,
  pauseFile: (file: AudioFile) => void,
}

export type SongChooserHookValue = [SongChooserHookState, SongChooserHookActions]

export const defaultState = {
}

export type callbackType = (state: SongChooserHookState) => SongChooserHookState
export type withCallback = (cb: callbackType) => void
