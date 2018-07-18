import React from 'react'
import ReactHowler from 'react-howler'
import SeekBarContainer from './seek-bar-container'

class MediaPlayer extends React.Component {
  state = {
    lastSeekEnd: 0,
  }
  onSeek = (time) => {
    this.setState({lastSeekEnd: time})
  }

  render() {

    return (
      <React.Fragment>
        <SeekBarContainer
          onSeek={this.onSeek}
          seekValue={this.state.lastSeekEnd}
        />
        <ReactHowler
          src='/sound.mp3'
          playing={false}
          seek={this.state.lastSeekEnd}
        />
      </React.Fragment>
    )
  }
}

export default MediaPlayer
