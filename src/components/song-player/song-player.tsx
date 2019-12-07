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

    /*
    type SeekBarProps = {
      totalTime?: any,
      currentTime?: any,
      bufferedTime?: any,
      isSeekable?: any,
      onSeek?: any,
      onSeekStart?: any,
      onSeekEnd?: any,
      onIntent?: any,
      style?: any,
      lastTouched?: string,
      className?: any,
      leftCircle?: any,
    };
*/

    // {spriteInfo && <SeekBarContainter {...seekProps} />}
    if (!spriteInfo) {
        return <div/>
    }

    const position = spriteInfo.spriteProgress * 100

    // const position = seekState.isSeeking ? seekState.intentPosition : spriteInfo.spriteProgress * 100
    // seek={onSeek}

    const clip = spriteInfo.section
    const play = async () => {
        const sprite = await playClip(clip)
        // sprite.play() // sprite will automatically play because the store will short circuit on the already loaded file
    }

    let button = (
        <PlayButton
            isEnabled={true}
            onClick={play}
        />
    )

    if (spriteInfo && spriteInfo.playing) {
        button = <PauseButton onClick={play}/>
    }

    return (
        <div style={{marginBottom: '50px', border: '1px solid', backgroundColor: 'orange'}}>
            {button}
            <div>
                {displayTime(spriteInfo.songPosition)}
                {' / '}
                {displayTime(activeSpriteContainer.sprite.howl.duration())}
            </div>
            <div>
                {displayTime(spriteInfo.spritePosition)}
                {' / '}
                {displayTime(spriteInfo.length)}
            </div>
            <SeekBar
                {...seekState}
                {...seekActions}
                leftCircle={{
                    position,
                }}
                fullLength={spriteInfo.length}
                highlights={highlights}
                {...seekProps}
            />
        </div>
    )
}
