import React from 'react'
import ReactDOM from 'react-dom'

export default class Waveform extends React.Component {
  state = {
    loading: false,
  }

  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  static defaultProps = {
    buffer: null,
    width: 500,
    height: 100,
    zoom: 1,
    color: 'black',
  }

  componentDidMount() {
    var width = this.props.width * this.props.zoom;
    var middle = this.props.height / 2;

    var channelData = this.props.buffer.getChannelData(0);
    var step = Math.ceil(channelData.length / width);

    const domNode = document.getElementById('waveform-canvas')
    // const domNode = this.ref.getDOMNode()
    var ctx = domNode.getContext('2d');
    ctx.fillStyle = this.props.color;

    this.draw(width, step, middle, channelData, ctx);
  }

  draw(width, step, middle, data, ctx) {
    for (var i = 0; i < width; i += 1) {
      var min = 1.0;
      var max = -1.0;

      for (var j = 0; j < step; j += 1) {
        var datum = data[(i * step) + j];

        if (datum < min) {
          min = datum;
        } else if (datum > max) {
          max = datum;
        }

        ctx.fillRect(i, (1 + min) * middle, 1, Math.max(1, (max - min) * middle));
      }
    }
  }

  render() {
    return (
      <canvas
        id='waveform-canvas'
        ref={this.ref}
        className="waveform"
        width={this.props.width * this.props.zoom}
        height={this.props.height}>
      </canvas>
    );
  }
}
