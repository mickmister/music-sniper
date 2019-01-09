import React from 'react'

import {AudioFile} from '../../types/music-types'
import PlayButton from '../play-button'
import styles from '../song-chooser/song-chooser.module.scss'

type SongPlayerProps = {
  file: AudioFile,
}

export default function SongPlayer(props: SongPlayerProps) {
  const {file} = props

  return (
  <div key={file.id} className={styles.browseGridCell}>
    <p className={styles.songTitle}>
      {file.file_name}
    </p>
    <PlayButton file={file} />
  </div>
  )
}
