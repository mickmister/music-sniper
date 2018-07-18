import React from 'react'
import {ProgressBar} from 'react-player-controls'

const styles = {
  width: '333px',
}

class SeekBar extends React.Component {
  displayTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    const minutesStr = minutes > 9 ? minutes : `0${minutes}`
    const secondsStr = seconds > 9 ? seconds : `0${seconds}`

    return `${minutesStr}:${secondsStr}`
  }

  render() {
    const fields = [
      'currentTime', 'lastSeekStart', 'lastSeekEnd', 'lastIntent'
    ]

    return (
      <div style={styles}>
        <ProgressBar
          {...this.props}
        />
      <h2>
        {this.displayTime(this.props.currentTime)}
      </h2>
    </div>
    )
  }
}

export default SeekBar
