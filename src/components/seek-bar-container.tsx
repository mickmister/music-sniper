import React from 'react'
import SeekBar from './seek-bar'

type SeekBarContainerState = {
  totalTime: number,
  currentTime: number,
  bufferedTime: number,
  isSeekable: boolean,
  lastSeekStart: number,
  lastIntent: number
}

type SeekBarContainerProps = {
  onSeek: (time: number) => void,
  seekValue: number,
}

class SeekBarContainer extends React.PureComponent<SeekBarContainerProps, SeekBarContainerState> {
  state = {
    totalTime: 827,
    currentTime: 0,
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
            onSeek: (time: number) => this.setState(() => ({ currentTime: time })),
            onSeekStart: (time: number) => this.setState(() => ({ lastSeekStart: time })),
            onSeekEnd: this.onSeekEnd,
            onIntent: (time: number) => this.setState(() => ({ lastIntent: time })),
          }}
          currentTime={this.state.currentTime}
        />
      </React.Fragment>
    )
  }
}

export default SeekBarContainer
