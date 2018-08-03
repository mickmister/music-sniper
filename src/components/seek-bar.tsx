import React from 'react'

import { ProgressBar } from 'react-player-controls'
import { ProgressBarProps } from '../types/props'
const styles = {
  width: '333px'
}

type SeekBarProps = {
  progressBarProps: ProgressBarProps,
  currentTime: number,
}

class SeekBar extends React.PureComponent<SeekBarProps> {
  displayTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const minutesStr = minutes > 9 ? minutes : `0${minutes}`
    const secondsStr = seconds > 9 ? seconds : `0${seconds}`
    return `${minutesStr}:${secondsStr}`
  }

  render() {

    const progressBarProps: ProgressBarProps = this.props.progressBarProps

    return (
      <div style={styles}>
        <ProgressBar {...progressBarProps} />
        <h2>{this.displayTime(this.props.currentTime)}</h2>
      </div>
    )
  }
}
export default SeekBar
