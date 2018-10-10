import React from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'

import './styles/styles'
import './music-processing/audio-slicer'
import SongLoader from './services/song-loader'
import SeekBarContainter from './components/seek-bar-container'
import { Percentage, Section } from 'types/music-types'
import { StaticSprite } from './music-processing/static-sprite'
import { SpriteContainer } from './music-processing/sprite-container'
import { DynamicSprite } from './music-processing/sprite'
import { SpriteInformation } from './types/music-types'

interface Props {}
interface State {

}

class Main extends React.PureComponent<Props, State> {
  spriteContainer: SpriteContainer
  sprite: StaticSprite | DynamicSprite
  fullSpriteContainer: SpriteContainer
  fullSprite: StaticSprite | DynamicSprite

  songLoader = new SongLoader()
  state = {
    songs: [],
    currentSeek: 0,
    currentFullSeek: 0,
    startPercent: 0,
    endPercent: 0,
  }
  componentDidMount() {
    this.fetchSongData()
  }

  onSeek = (seekValue: Percentage) =>  {
    this.setState({currentSeek: seekValue})
    this.spriteContainer.sprite.seekPercentage(seekValue)
  }

  onSeekFull = (seekValue: Percentage) =>  {
    this.setState({currentFullSeek: seekValue})
    this.fullSpriteContainer.sprite.seekPercentage(seekValue)
  }

  fetchSongData = async() => {
    const {data} = await axios.get('/public/data/song-data.json')
    const fileName = data.songs[0].fileName
    const blobUrl = await this.songLoader.fetch(fileName)
    this.makeSprite(blobUrl, data)
    this.fullSprite = new DynamicSprite(blobUrl, {name: 'full', start: 0, end: 0})
    this.fullSpriteContainer = new SpriteContainer(this.fullSprite)
    this.fullSpriteContainer.getObsvervableForInterval().subscribe((spriteInfo: SpriteInformation) => {
      this.setState({currentFullSeek: spriteInfo.spriteProgress})
    })

  }

  makeSprite = (blobUrl: string, data: any) => {
    const section = data.songs[0].sections[0] as Section
    this.sprite = new DynamicSprite(blobUrl, section)
    this.spriteContainer = new SpriteContainer(this.sprite)
    this.spriteContainer.getObsvervableForInterval().subscribe((spriteInfo: SpriteInformation) => {
      this.setState({currentSeek: spriteInfo.spriteProgress})
    })
  }

  render() {
    const fullSeekProps = {
      onSeek: this.onSeekFull,
      seekValue: this.state.currentFullSeek,
      currentPercent: this.state.currentFullSeek,
    }
    const seekProps = {
      onSeek: this.onSeek,
      seekValue: this.state.currentSeek,
      currentPercent: this.state.currentSeek,
    }
    const startSeekProps = {
      onSeek: (seekValue: Percentage) => {
        this.setState({startPercent: seekValue})
        this.sprite.setStartPercentage(seekValue)
        this.sprite.seekPercentage(seekValue)
      },
      seekValue: 0,
      currentPercent: this.state.startPercent || (this.sprite && this.sprite.getStartPercentage()) || 0,
    }
    const endSeekProps = {
      onSeek: (seekValue: Percentage) => {
        this.setState({endPercent: seekValue})
        this.sprite.setEndPercentage(seekValue)
      },
      seekValue: 0,
      currentPercent: this.state.endPercent || (this.sprite && this.sprite.getEndPercentage()) || 0,
    }
    window.s = this.sprite

    return (
      <div>
        <SeekBarContainter {...fullSeekProps} />
        <Button bsClass='btn btn-default' onClick={() => this.fullSprite.play()}>Play</Button>
        <Button onClick={() => this.fullSprite.pause()}>Pause</Button>
        <Button onClick={() => this.fullSprite.howl.stop()}>Stop</Button>
        <SeekBarContainter {...seekProps} />
        <Button onClick={() => this.sprite.play()}>Play</Button>
        <Button onClick={() => this.sprite.pause()}>Pause</Button>
        <Button onClick={() => this.sprite.howl.stop()}>Stop</Button>
        <SeekBarContainter {...startSeekProps} />
        <SeekBarContainter {...endSeekProps} />
        <input style={{fontSize: '40px'}} value={this.sprite && this.sprite.section.start.toFixed(2)} />
        <input style={{fontSize: '40px'}} value={this.sprite && this.sprite.section.end.toFixed(2)} />
      </div>
    )
    // return <MediaPlayerContainer />
  }
}
export default Main
