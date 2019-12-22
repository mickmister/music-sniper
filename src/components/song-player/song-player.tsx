import React from 'react'
import {useStoreActions, Actions} from 'easy-peasy'
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

        const sprite = await playClip(spriteInfo.section)

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
    let clipName = ''
    if (spriteInfo) {
        songPosition = spriteInfo.songPosition
        songLength = activeSpriteContainer.sprite.howl.duration()
        spritePosition = spriteInfo.spritePosition
        length = spriteInfo.length
        clipName = activeSpriteContainer.sprite.clip.name
    }
    const timeInfo = (
        <>
            <div>
                {clipName}
            </div>
            <div>
                {displayTime(songPosition)}
                {' / '}
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
