import React from 'react'
import {ProgressBar} from 'react-player-controls'

const styles = {
  width: '333px',
}

class SeekBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      totalTime: 480,
      currentTime: 0,
      bufferedTime: 0,
      isSeekable: true,
      lastSeekStart: 0,
      lastSeekEnd: 0,
      lastIntent: 0,
    }
  }

  render() {
    const fields = [
      'currentTime', 'lastSeekStart', 'lastSeekEnd', 'lastIntent'
    ]
    return (
      <div style={styles}>
        <ProgressBar
          totalTime={this.state.totalTime}
          currentTime={this.state.currentTime}
          bufferedTime={this.state.bufferedTime}
          isSeekable={this.state.isSeekable}
          onSeek={time => this.setState(() => ({ currentTime: time }))}
          onSeekStart={time => this.setState(() => ({ lastSeekStart: time }))}
          onSeekEnd={time => this.setState(() => ({ lastSeekEnd: time }))}
          onIntent={time => this.setState(() => ({ lastIntent: time }))}
        />
      {fields.map(f => (
        <h2>{f}
          { this.state[f].toFixed(3)}
        </h2>
      ))}
    </div>
    )
  }
}

export default SeekBar
