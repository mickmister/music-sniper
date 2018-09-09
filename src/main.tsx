import React from 'react'
import axios from 'axios'

import './styles/styles'
import MediaPlayerContainer from './components/media-player-container'
import './music-processing/audio-slicer'
import SongLoader from 'services/song-loader'

interface Props {}
interface State {}

class Main extends React.PureComponent<Props, State> {
  songLoader = new SongLoader()
  state = {
    songs: [],
  }
  componentDidMount() {
    this.fetchSongData()
  }

  fetchSongData = async() => {
    const {data} = await axios.get('/public/data/song-data.json')
    const fileName = data.songs[0].fileName
    const songData = await this.songLoader.fetch(fileName)
    const howl = new Howl({
      src: [songData],
      html5: true,
    })
    setTimeout(howl.play)
  }

  render() {
    return <MediaPlayerContainer />
  }
}
export default Main
