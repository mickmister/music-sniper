import React from 'react'
import SeekBar from './seek-bar'

class SeekBarContainer extends React.Component {
  state = {
    totalTime: 480,
    currentTime: 0,
    bufferedTime: 0,
    isSeekable: true,
    lastSeekStart: 0,
    // lastSeekEnd: 0,
    lastIntent: 0,
  }

  onSeekEnd = (time) => {
    this.props.onSeek(time)
  }

  render() {
    return (
      <React.Fragment>
        <SeekBar
          {...this.state}
          lastSeekEnd={this.props.seekValue}
          onSeek={time => this.setState(() => ({ currentTime: time }))}
          onSeekStart={time => this.setState(() => ({ lastSeekStart: time }))}
          onSeekEnd={this.onSeekEnd}
          onIntent={time => this.setState(() => ({ lastIntent: time }))}
        />
      </React.Fragment>
    )
  }
}

export default SeekBarContainer
