import {AudioFile} from '../../types/music-types'

export interface SongChooserHookState {
  audioFiles: AudioFile[],
  selectedFile: File | null,
}

export interface SongChooserHookActions {
  addAudioFileToCollection: (state: SongChooserHookState, audio_file: AudioFile) => void,
  uploadFile: () => void,
  selectUploadFile: (state: SongChooserHookState, file: File) => void,
  playFile: (state: SongChooserHookState, file: AudioFile) => void,
  pauseFile: (state: SongChooserHookState, file: AudioFile) => void,
  fetchAudioFiles: () => void,
  addSongs: (state: SongChooserHookState, songs: AudioFile[]) => void,
}

export type SongChooserHookValue = [SongChooserHookState, SongChooserHookActions]
