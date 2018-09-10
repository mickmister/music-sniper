import React from 'react'
import axios from 'axios'

import './styles/styles'
import MediaPlayerContainer from './components/media-player-container'
import './music-processing/audio-slicer'
import SongLoader from './services/song-loader'
import SeekBarContainter from './components/seek-bar-container'
import { Percentage, Section } from 'types/music-types'
import { StaticSprite } from './music-processing/static-sprite'
import { SpriteContainer } from './music-processing/sprite-container'
import { DynamicSprite } from 'music-processing/sprite'
import { SpriteInformation } from './types/music-types'

interface Props {}
interface State {

}

class Main extends React.PureComponent<Props, State> {
  spriteContainer: SpriteContainer
  sprite: StaticSprite | DynamicSprite
  songLoader = new SongLoader()
  state = {
    songs: [],
    currentSeek: 0,
  }
  componentDidMount() {
    this.fetchSongData()
  }

  onSeek = (seekValue: Percentage) =>  {
    this.setState({currentSeek: seekValue})
    this.spriteContainer.sprite.seekPercentage(seekValue)
  }

  fetchSongData = async() => {
    const {data} = await axios.get('/public/data/song-data.json')
    const fileName = data.songs[0].fileName
    const blobUrl = await this.songLoader.fetch(fileName)
    this.makeSprite(blobUrl, data)
  }

  makeSprite = (blobUrl: string, data: any) => {
    const section = data.songs[0].sections[0] as Section
    this.sprite = new StaticSprite(blobUrl, section)
    this.spriteContainer = new SpriteContainer(this.sprite)
    this.spriteContainer.getObsvervableForInterval().subscribe((spriteInfo: SpriteInformation) => {
      console.log(spriteInfo)
    })
  }

  render() {
    const seekProps = {
      onSeek: this.onSeek,
      seekValue: this.state.currentSeek,
      currentPercent: this.state.currentSeek,
    }
    return (
      <div>
        <SeekBarContainter {...seekProps} />
        <button onClick={() => this.sprite.play()} />
        <button onClick={() => this.sprite.pause()} />
      </div>
    )
    // return <MediaPlayerContainer />
  }
}
export default Main
