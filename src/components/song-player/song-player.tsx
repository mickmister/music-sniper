import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';

import '../../styles/styles'
import '../../music-processing/audio-slicer'
import SongLoader from '../../services/song-loader'
import { Percentage, Section } from 'types/music-types'
import { StaticSprite } from '../../music-processing/static-sprite'
import { SpriteContainer } from '../../music-processing/sprite-container'
import { DynamicSprite } from '../../music-processing/sprite'
import { SpriteInformation, Percentage } from '../../types/music-types'
import {displayTime} from '../../util/display-time'
import { useSeekBar } from './seek-bar/seek-bar-hook';
import { useHighlights } from './highlight-marker/highlights-hook';

import SeekBarContainter from '../../components/seek-bar-container'

import SeekBar from './seek-bar/seek-bar'

type Props = {
    spriteInfo: SpriteInformation
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
    const {spriteInfo, onSeek} = props
    const [seekState, seekActions] = useSeekBar()
    const [highlights, highlightActions] = useHighlights([])

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
      return <div />
    }

    const position = spriteInfo.spriteProgress * 100
    // const position = seekState.isSeeking ? seekState.intentPosition : spriteInfo.spriteProgress * 100
    // seek={onSeek}

    return (
      <div style={{marginBottom: '400px', border: '1px solid', backgroundColor: 'orange'}}>
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
}
