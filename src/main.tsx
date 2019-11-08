import React from 'react'

import {SpriteContainer} from 'music-processing/sprite-container'

import PlaybackContainer from './components/playback/playback-container'
import DoubleSeekBarContainer from './components/double-seek-bar/double-seek-bar-container'

type Props = {}
type State = {
    spriteContainer: SpriteContainer | null;
    refresh: boolean;
}

class Main extends React.PureComponent<Props, State> {
    state = {
        spriteContainer: null,
        refresh: false,
    }

    setSpriteContainer = (spriteContainer: SpriteContainer): void => {
        spriteContainer.sprite.play().stop()
        this.setState({spriteContainer})
    }

    setBounds = ({leftPosition, rightPosition}): void => {
        const {spriteContainer} = this.state
        if (spriteContainer) {
            const duration = spriteContainer.sprite.howl.duration()

            spriteContainer.sprite.section.start = (leftPosition / 100) * duration
            spriteContainer.sprite.section.end = (rightPosition / 100) * duration
        }
        this.refresh()
    }

    setSpriteStart = (num: number): void => {
        this.state.spriteContainer.sprite.section.start = num
        this.refresh()
    }

    setSpriteEnd = (num: number): void => {
        this.state.spriteContainer.sprite.section.end = num
        this.refresh()
    }

    refresh = (): void => {
        this.setState({refresh: !this.state.refresh})
    }

    addSection = (): void => {
        this.state.spriteContainer.sections.push({
            start: this.state.spriteContainer.sprite.section.start,
            end: this.state.spriteContainer.sprite.section.end,
        })
        this.refresh()
    }

    render(): JSX.Element {
        const {spriteContainer, refresh} = this.state
        let duration
        if (spriteContainer) {
            duration = spriteContainer.duration()
        }

        let seekBar
        if (spriteContainer) {
            seekBar = (
                <DoubleSeekBarContainer
                    spriteContainer={spriteContainer}
                    setBounds={this.setBounds}
                    leftPosition={(spriteContainer.sprite.section.start / duration) * 100}
                    rightPosition={(spriteContainer.sprite.section.end / duration) * 100}
                    duration={duration}
                />
            )
        } else {
            seekBar = (
                <DoubleSeekBarContainer
                    spriteContainer={null}
                    setBounds={this.setBounds}
                    leftPosition={0}
                    rightPosition={100}
                    duration={duration}
                />
            )
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
                {seekBar}
                {spriteContainer && (
                    <div>
                        <pre>
                            {JSON.stringify(spriteContainer.sections, null, 2)}
                        </pre>
                        <button onClick={this.addSection}>Add Section</button>
                    </div>
                )}
            </div>
        )

        // return <MediaPlayerContainer />
    }
}
export default Main
