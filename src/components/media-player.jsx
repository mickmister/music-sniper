import React, { Component } from 'react'
import { Media, Player, controls, utils } from 'react-media-player'
const { PlayPause, CurrentTime, Progress, SeekBar, Duration, MuteUnmute, Volume, Fullscreen } = controls
const { keyboardControls } = utils

class MediaPlayer extends Component {
  render() {
    const { Player, keyboardControls } = this.props
    return (
      <Media>
        { mediaProps =>
          <div
            className="media"
            onKeyDown={keyboardControls.bind(null, mediaProps)}
          >
            <Player
              src="against-them-all.mp3"
              className="media-player"
            />
            <div className="media-controls">
              <PlayPause/>
              <CurrentTime/>
              <Progress/>
              <SeekBar/>
              <Duration/>
              <MuteUnmute/>
              <Volume/>
              <Fullscreen/>
            </div>
          </div>
        }
      </Media>
    )
  }
}

export default MediaPlayer
