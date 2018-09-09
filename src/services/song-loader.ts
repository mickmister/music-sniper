import axios from 'axios'
import { IStringTMap } from 'types/generics'

type SongStore = IStringTMap<string>
type AudioData = string

const makeBlobUrl = (audioData: AudioData) => {
  const blob = new Blob([audioData])
  return window.URL.createObjectURL(blob)
}

export default class SongLoader {
  songs: SongStore = {}

  fetch = async (fileName: string) => {
    if (this.songs[fileName]) {
      return this.songs[fileName]
    }
    const audioData = (await axios.get(
      fileName,
      {responseType: 'arraybuffer'},
    )).data as AudioData

    const blobUrl = makeBlobUrl(audioData)
    this.songs[fileName] = blobUrl
    return blobUrl
  }
}
