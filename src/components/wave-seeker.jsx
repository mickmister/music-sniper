import React from 'react'
import Waveform from './waveform'

class WaveSeeker extends React.Component {
  state = {
    buffer: null,
  }

  componentDidMount() {
    const url = '/sound'

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.addEventListener('load', () => {
      var context = new (window.AudioContext || window.webkitAudioContext)();

      context.decodeAudioData(request.response, (buffer) => {
        this.setState({buffer})
      });
    });
    request.send();
  }
  render() {
    // const channelData = [
    //
    // ]
    // const buffer = {
    //   getChannelData: () => channelData,
    // }
    const {buffer} = this.state
    return (
      <div style={{height: '500px', width: '500px'}}>
        {buffer && <Waveform buffer={buffer} />}
      </div>
    )
  }
}

export default WaveSeeker
