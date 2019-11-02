import React from 'react'

import {ProgressBar, ProgressBarProps} from 'react-player-controls'

import {displayTime} from '../util/display-time'

type SeekBarProps = {
    progressBarProps: ProgressBarProps;
}

class SeekBar extends React.PureComponent<SeekBarProps> {
    render() {
        const progressBarProps: ProgressBarProps = this.props.progressBarProps

        return (
            <div className='seek-bar'>
                <ProgressBar {...progressBarProps}/>
                {/* <h2>{displayTime(progressBarProps.currentTime)}</h2> */}
            </div>
        )
    }
}
export default SeekBar
