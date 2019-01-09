import React, {useContext} from 'react'
import {Button} from 'react-bootstrap'

import { AudioFile } from '../types/music-types'
import styles from './song-chooser/song-chooser.module.scss'
import SongChooserContext, {SongChooserContextValue} from '../contexts/song-chooser-context'

type PlayButtonProps = {
  file: AudioFile,
}

export default function PlayButton(props: PlayButtonProps) {
  const {state, actions} = useContext(SongChooserContext) as SongChooserContextValue

  const {file} = props
  const playing = file.playing
  const buttonLabel = file.loading ? 'Loading' : (playing ? 'Pause' : 'Play')
  const playFunc = playing ? actions.pauseFile : actions.playFile

  return (
    <Button bsClass={`btn btn-primary ${styles.playButton}`} bsSize='large' onClick={() => playFunc(file)} disabled={file.loading}>
      {buttonLabel}
    </Button>
  )
}
