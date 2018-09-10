import React from 'react'
import SeekBar from './seek-bar'
import { Percentage } from 'types/music-types';

type SeekBarContainerState = {
  bufferedTime: number,
  isSeekable: boolean,
  lastSeekStart: number,
  lastIntent: number
}

export type SeekBarContainerProps = {
  onSeek: (time: number) => void,
  seekValue: number,
  currentPercent: Percentage,
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
            currentTime: this.props.currentPercent,
            totalTime: 100,
          }}
        />
      </React.Fragment>
    )
  }
}

export default SeekBarContainer
