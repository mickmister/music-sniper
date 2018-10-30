import React from 'react'
import axios from 'axios'
import {Howl} from 'howler'

type File = any

type SongChooserState = {
  audio_files: AudioFile[],
  selectedFile: File | null,
}

import SongLoader from '../../services/song-loader'
import SongChooser from './song-chooser'

const loader = new SongLoader()

class SongChooserContainer extends React.PureComponent<any, SongChooserState> {
  state = {
    audio_files: [],
    selectedFile: null,
  }

  componentDidMount() {
    this.fetchAudioFiles()
  }

  fetchAudioFiles = async () => {
    const {data: audio_files} = await axios.get('/audio_files', {onDownloadProgress: console.log})
    this.setState({audio_files})

  }

  playFile = async (file) => {
    const blobUrl = await loader.fetch(file.url)
    const howl = new Howl({src: blobUrl, format: 'mp3'})
    howl.play()
  }

  selectedUploadFile = (file: File) => {
    this.setState({selectedFile: file})
  }

  uploadFile = async () => {
    const {selectedFile} = this.state
    if (!selectedFile) {
      return
    }

    const form = new FormData()
    form.append('audio_file[attached_file]', selectedFile)
    const res = axios.post('audio_files', {
      data: form,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    console.log(await res)
  }

  render() {
    const songUploaderProps = {
      selectedFile: this.selectedUploadFile,
      uploadFile: this.uploadFile,
    }
    return (
      <SongChooser {...this.state} playFile={this.playFile} songUploaderProps={songUploaderProps} />
    )
  }
}

export default SongChooserContainer
