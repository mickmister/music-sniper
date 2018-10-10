import React from 'react'
import PlaybackContainer from './components/playback/playback-container'
import DoubleSeekBarContainer from './components/double-seek-bar/double-seek-bar-container'
import { SpriteContainer } from 'music-processing/sprite-container';

interface Props {}
interface State {
  spriteContainer: SpriteContainer | null,
  refresh: boolean,
}

class Main extends React.PureComponent<Props, State> {
  state = {
    spriteContainer: null,
    refresh: false,
  }

  setSpriteContainer = (spriteContainer: SpriteContainer) => {
    spriteContainer.sprite.play().stop()
    this.setState({spriteContainer})
  }

  setBounds = ({leftPosition, rightPosition}) => {
    const {spriteContainer} = this.state
    if (spriteContainer) {
      const duration = spriteContainer.sprite.howl.duration()

      spriteContainer.sprite.section.start = (leftPosition / 100) * duration
      spriteContainer.sprite.section.end = (rightPosition / 100) * duration
    }
    this.refresh()
  }

  setSpriteStart = (num: number) => {
    this.state.spriteContainer.sprite.section.start = num
    this.refresh()
  }

  setSpriteEnd = (num: number) => {
    this.state.spriteContainer.sprite.section.end = num
    this.refresh()
  }

  refresh = () => {
    this.setState({refresh: !this.state.refresh})
  }

  render() {
    const {spriteContainer, refresh} = this.state
    let duration
    if (spriteContainer) {
      duration = spriteContainer.duration()
    }
    return (
      <div>
        <PlaybackContainer
          spriteContainer={spriteContainer}
          setSpriteContainer={this.setSpriteContainer}
          setSpriteStart={this.setSpriteStart}
          setSpriteEnd={this.setSpriteEnd}
          refresh={refresh}
        />
        {spriteContainer ? (
          <React.Fragment>
            <DoubleSeekBarContainer
              spriteContainer={spriteContainer}
              setBounds={this.setBounds}
              leftPosition={(spriteContainer.sprite.section.start / duration) * 100}
              rightPosition={(spriteContainer.sprite.section.end / duration) * 100}
              duration={duration}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DoubleSeekBarContainer
              spriteContainer={null}
              setBounds={this.setBounds}
              leftPosition={0}
              rightPosition={100}
              duration={duration}
            />
          </React.Fragment>
        )}
      </div>
    )
    // return <MediaPlayerContainer />
  }
}
export default Main
