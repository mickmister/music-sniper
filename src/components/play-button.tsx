import React from 'react'
import {Button} from 'react-bootstrap'
import {useAction} from 'easy-peasy'

import {AudioFile} from '../types/music-types'
import styles from './song-chooser/song-chooser.module.scss'

type PlayButtonProps = {
  file: AudioFile,
}

export default function PlayButton(props: PlayButtonProps) {
  const playFile = useAction((dispatch: any) => dispatch.songs.playFile)
  const pauseFile = useAction((dispatch: any) => dispatch.songs.pauseFile)

  const {file} = props
  const playing = file.playing
  const buttonLabel = file.loading ? 'Loading' : (playing ? 'Pause' : 'Play')
  const playFunc = playing ? pauseFile : playFile

  return (
    <Button bsClass={`btn btn-primary ${styles.playButton}`} bsSize='large' onClick={() => playFunc(file)} disabled={file.loading}>
      {buttonLabel}
    </Button>
  )
}
