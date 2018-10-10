import React from 'react'
import {displayTime} from '../util/display-time'

import { ProgressBar, ProgressBarProps } from 'react-player-controls'

type SeekBarProps = {
  progressBarProps: ProgressBarProps,
}

class SeekBar extends React.PureComponent<SeekBarProps> {
  render() {

    const progressBarProps: ProgressBarProps = this.props.progressBarProps

    return (
      <div className='seek-bar'>
        <ProgressBar {...progressBarProps} />
        {/* <h2>{displayTime(progressBarProps.currentTime)}</h2> */}
      </div>
    )
  }
}
export default SeekBar
