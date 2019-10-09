import {AudioFile} from '../../types/music-types'

export interface SongChooserHookState {
  audioFiles: AudioFile[],
  selectedFile: File | null,
  currentPlayingSongId: number | null,
  currentPlayingSong: () => void,
}

export interface SongChooserHookActions {
  addAudioFileToCollection: (state: SongChooserHookState, audio_file: AudioFile) => void,
  uploadFile: (state: SongChooserHookState, file: File) => void,
  setCurrentPlayingSong: (state: SongChooserHookState, audioFile: AudioFile) => void,
  playFile: (state: SongChooserHookState, file: AudioFile) => void,
  pauseFile: (state: SongChooserHookState, file: AudioFile) => void,
  fetchAudioFiles: () => void,
  addSongs: (state: SongChooserHookState, songs: AudioFile[]) => void,
  updateFile: (state: SongChooserHookState, file: AudioFile) => void,
}

export interface DispatchSongChooserActions {
    addAudioFileToCollection: (audio_file: AudioFile) => void,
    uploadFile: (file: File) => void,
    setCurrentPlayingSong: (audioFile: AudioFile) => void,
    playFile: (file: AudioFile) => void,
    pauseFile: (file: AudioFile) => void,
    fetchAudioFiles: () => void,
    addSongs: (songs: AudioFile[]) => void,
    updateFile: (file: AudioFile) => void,
}

export type SongChooserHookValue = [SongChooserHookState, SongChooserHookActions]
