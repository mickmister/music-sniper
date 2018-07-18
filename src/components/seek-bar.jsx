import React from 'react'
import {ProgressBar} from 'react-player-controls'

const styles = {
  width: '333px',
}

class SeekBar extends React.Component {
  render() {
    const fields = [
      'currentTime', 'lastSeekStart', 'lastSeekEnd', 'lastIntent'
    ]

    return (
      <div style={styles}>
        <ProgressBar
          {...this.props}
        />
        {fields.map(f => (
          <h2>
            {f}
            {this.props[f].toFixed(3)}
          </h2>
        ))}
    </div>
    )
  }
}

export default SeekBar
