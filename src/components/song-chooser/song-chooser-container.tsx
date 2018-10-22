import React from 'react'
import axios from 'axios'
import {Howl} from 'howler'

type File = any

type SongChooserState = {
  audio_files: File[],
}

import SongChooser from './song-chooser'

class SongChooserContainer extends React.PureComponent<any, SongChooserState> {
  state = {
    audio_files: [],
  }

  componentDidMount() {
    this.fetchAudioFiles()
  }

  fetchAudioFiles = async () => {
    const {data: audio_files} = await axios.get('/api/audio_files')
    this.setState({audio_files})
  }

  playFile = (file) => {
    const howl = new Howl({src: file.url, format: 'mp3'})
    howl.play()
  }

  render() {
    return (
      <SongChooser {...this.state} playFile={this.playFile} />
    )
  }
}

export default SongChooserContainer
