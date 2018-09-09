import React from 'react'
import SeekBar from './seek-bar'

type SeekBarContainerState = {
  bufferedTime: number,
  isSeekable: boolean,
  lastSeekStart: number,
  lastIntent: number
}

type SeekBarContainerProps = {
  onSeek: (time: number) => void,
  seekValue: number,
  currentTime: number,
  songDuration: number,
}

class SeekBarContainer extends React.PureComponent<SeekBarContainerProps, SeekBarContainerState> {
  state = {
    // currentTime: 0,
    bufferedTime: 0,
    isSeekable: true,
    lastSeekStart: 0,
    // lastSeekEnd: 0,
    lastIntent: 0
  }

  onSeekEnd = (time: number) => {
    this.props.onSeek(time)
  }

  render() {
    return (
      <React.Fragment>
        <SeekBar
          progressBarProps={{
            ...this.state,
            lastSeekEnd: this.props.seekValue,
            onSeekStart: (time: number) => this.setState(() => ({ lastSeekStart: time })),
            onSeekEnd: this.onSeekEnd,
            onIntent: (time: number) => this.setState(() => ({ lastIntent: time })),
            currentTime: this.props.currentTime,
            totalTime: this.props.songDuration,
          }}
        />
        <SeekBar
          progressBarProps={{
            ...this.state,
            lastSeekEnd: this.props.seekValue,
            onSeekStart: (time: number) => this.setState(() => ({ lastSeekStart: time })),
            onSeekEnd: this.onSeekEnd,
            onIntent: (time: number) => this.setState(() => ({ lastIntent: time })),
            currentTime: this.props.currentTime,
            totalTime: this.props.songDuration,
          }}
        />
      </React.Fragment>
    )
  }
}

export default SeekBarContainer
