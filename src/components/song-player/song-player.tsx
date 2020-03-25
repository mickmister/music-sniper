import React from 'react'
import {useStoreActions, Actions, useStoreState, State} from 'easy-peasy'
import {PlayButton, PauseButton} from 'react-player-controls'

import '../../music-processing/audio-slicer'

import {SpriteInformation, Percentage} from '../../types/music-types'
import {displayTime} from '../../util/display-time'
import {IGlobalStore} from '../../store/store-types'
import {SpriteContainer} from '../../music-processing/sprite-container'

import {useSeekBar} from './seek-bar/seek-bar-hook'
import {useHighlights} from './highlight-marker/highlights-hook'
import SeekBar from './seek-bar/seek-bar'

type Props = {
    spriteInfo: SpriteInformation
    activeSpriteContainer: SpriteContainer
    onSeek: (seekValue: Percentage) => void
}

// const onSeek = (seekValue: Percentage) =>  {
//     const {spriteContainer} = this.props
//     if (spriteContainer) {
//       spriteContainer.sprite.seekPercentage(seekValue)
//     }
//     this.setState({currentSeek: seekValue})
//   }

export const CurrentSpriteFullPlayer = () => {
    const spriteInfo = useStoreState((state: State<IGlobalStore>) => state.songs.activeSpriteInfo)
    const seekActiveSprite = useStoreActions((state: Actions<IGlobalStore>) => state.songs.seekActiveSprite)
    const activeSprite = useStoreState((state: State<IGlobalStore>) => state.songs.activeSpriteContainer)

    const [show, setShow] = React.useState(true)

    if (location.pathname === '/login') {
        return <div className={styles.footer}/>
    }

    const buttonText = show ? 'Hide' : 'Show'
    const showButton = (
        <button onClick={() => setShow(!show)}>
            {buttonText}
        </button>
    )

    const style = {}
    if (!show) {
        style.display = 'none'
    }

    return (
        <>
            {activeSprite && <p>{activeSprite.sprite.clip.name}</p>}
            <SongPlayer
                show={show}
                spriteInfo={spriteInfo}
                onSeek={seekActiveSprite}
                activeSpriteContainer={activeSprite}
            />
            <div>
                {/* {showButton} */}
            </div>
        </>
    )
}

export default function SongPlayer(props: Props) {
    const {spriteInfo, activeSpriteContainer, onSeek} = props
    const [seekState, seekActions] = useSeekBar()
    const [highlights, highlightActions] = useHighlights([])

    const playClip = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.songs.playClip)

    const seekProps = {

        // onSeekEnd: onSeek,
        seek: onSeek,

        seekValue: spriteInfo ? spriteInfo.spriteProgress : 0,
        currentPercent: spriteInfo ? spriteInfo.spriteProgress : 0,
    }

    let position = 0
    if (spriteInfo) {
        position = spriteInfo.spriteProgress * 100
    }

    // const position = seekState.isSeeking ? seekState.intentPosition : spriteInfo.spriteProgress * 100
    // seek={onSeek}

    const play = async () => {
        if (!spriteInfo) {
            return
        }

        const sprite = await playClip({...spriteInfo.section, masterPlayer: true})

        // sprite.play() // sprite will automatically play because the store will short circuit on the already loaded file
    }

    let playButton = (
        <PlayButton
            isEnabled={Boolean(spriteInfo)}
            onClick={play}
        />
    )

    if (spriteInfo && spriteInfo.playing) {
        playButton = <PauseButton onClick={play}/>
    }

    let songPosition = 0
    let spritePosition = 0
    let length = 0
    let songLength = 0
    let startTime = 0
    let endTime = 0
    if (spriteInfo) {
        songPosition = spriteInfo.songPosition
        songLength = activeSpriteContainer.sprite.howl.duration()
        spritePosition = spriteInfo.spritePosition
        length = spriteInfo.length
        startTime = spriteInfo.section.start_time
        endTime = spriteInfo.section.end_time
    }
    const timeInfo = (
        <>
            <div>
                {displayTime(startTime)}
                {' - '}
                {displayTime(endTime)}
                {' | '}
                {displayTime(songLength)}
            </div>
            <div>
                {displayTime(spritePosition)}
                {' / '}
                {displayTime(length)}
            </div>
        </>
    )

    const seekBar = null

    return (
        <>
            <div>
                {playButton}
            </div>
            <div>
                {timeInfo}
                <SeekBar
                    {...seekState}
                    {...seekActions}
                    leftCircle={{
                        position,
                    }}
                    fullLength={length}
                    highlights={highlights}
                    {...seekProps}
                />
            </div>
        </>
    )
}
