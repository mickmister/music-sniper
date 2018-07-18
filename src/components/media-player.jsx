import React from 'react'
import ReactHowler from 'react-howler'
import {PlayButton, PauseButton} from 'react-player-controls'
import SeekBarContainer from './seek-bar-container'

class MediaPlayer extends React.Component {
  state = {
    lastSeekEnd: 0,
    playing: false,
  }
  onSeek = (time) => {
    this.setState({lastSeekEnd: time})
  }

  play = () => {
    this.setState({playing: true})
  }

  pause = () => {
    this.setState({playing: false})
  }

  render() {

    const button = this.state.playing
      ? <PauseButton onClick={this.pause} />
    : <PlayButton isEnabled onClick={this.play} />

    return (
      <React.Fragment>
        {button}
        <SeekBarContainer
          onSeek={this.onSeek}
          seekValue={this.state.lastSeekEnd}
        />
        <ReactHowler
          src='/sound.mp3'
          playing={this.state.playing}
          seek={this.state.lastSeekEnd}
        />
      </React.Fragment>
    )
  }
}

export default MediaPlayer
