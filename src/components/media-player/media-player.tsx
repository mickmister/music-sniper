import React from 'react'
// import ReactHowler from 'react-howler'
import {Segment, Section} from '../../types/props'
import { PlayButton, PauseButton } from 'react-player-controls'

import {displayTime} from '../../util/display-time'
import SeekBarContainer from './../seek-bar-container'
import AudioSlicer from '../../music-processing/audio-slicer'

type MediaPlayerState = {
  lastSeekEnd: number,
  playing: boolean,
  currentTime: number,
  songDuration: number,
  segments: Segment[],
  workingSegment: Segment,
  playingSegment: Segment,
}

class MediaPlayer extends React.PureComponent<{}, MediaPlayerState> {
  slicer: AudioSlicer
  interval: any
  // private ref: any
  audioTime: number = 0
  tickTime: number

  state = {
    lastSeekEnd: 0,
    playing: false,
    currentTime: 0,
    songDuration: 0,
    workingSegment: {
      begin: 100,
      end: 300,
      name: 'j',
    },
    playingSegment: {
      begin: 0,
      end: 0,
      name: '',
    },
    segments: [],
  }

  async componentDidMount() {
    this.slicer = new AudioSlicer('sound.mp3')
    await this.slicer.run()
  }

  adjustForSpriteOffset = (time: number) => {
    const {playingSegment: s} = this.state
    return time - s.begin
  }

  onSeek = (time: number) => {
    this.setState({ lastSeekEnd: time, currentTime: time })
    this.audioTime = time * 1000
    this.slicer.sound.seek(time)
  }

  tick = () => {
    this.setState(() => {
      return {
        currentTime: (this.slicer.cu() as number)
      }
    })
  }

  setLowerBound = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seg = this.state.workingSegment
    this.setState({workingSegment: {...seg, start: parseFloat(e.target.value)}})
  }
  setUpperBound = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seg: Segment = this.state.workingSegment
    this.setState({workingSegment: {...seg, end: parseFloat(e.target.value)}})
  }
  setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seg = this.state.workingSegment
    this.setState({workingSegment: {...seg, name: e.target.value}})
  }

  play = (s: Segment = {start: 0, end: 0, name: 'd'}) => {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.slicer.playSegment(s)
    this.interval = setInterval(this.tick, 500)

    this.setState({ playing: true, songDuration: s.end - s.begin, playingSegment: s })
  }

  addBound = () => {
    const {workingSegment: seg} = this.state
    this.setState({segments: [...this.state.segments, {...seg}]})
  }

  pause = () => {
    this.slicer.sound.pause()
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.tick()
    this.setState({ playing: false })
  }

  playSection = (sec: Section) => {
    this.slicer.playSegment(sec)
    this.play(sec)
  }

  render() {
    const {workingSegment: {name, begin, end}} = this.state
    const button = this.state.playing ? (
      <PauseButton onClick={this.pause} />
    ) : (
      <PlayButton isEnabled onClick={this.play} />
    )

    return (
      <React.Fragment>
        {button}
        <SeekBarContainer
          onSeek={this.onSeek}
          seekValue={this.state.lastSeekEnd}
          currentTime={this.state.currentTime}
          // currentTime={this.adjustForSpriteOffset(this.state.currentTime)}
          songDuration={this.state.songDuration}
        />
        <input type='name' onChange={this.setName} value={name} />
        <input type='number' onChange={this.setLowerBound} value={begin} />
        <input type='number' onChange={this.setUpperBound} value={end} />
        <button onClick={this.addBound}>Add</button>
        {this.state.segments.map((s: Section) => (
          <div>
            <button onClick={() => this.playSegment(s)}>
              {s.name}
              {displayTime(s.start)}
              -
              {displayTime(s.end)}
            </button>
          </div>
        ))}
      </React.Fragment>
    )
  }
}

export default MediaPlayer
