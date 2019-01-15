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
    <audio
      src={file.url}
      controls
      style={{width: '100%'}}
      // autoPlay
    />
    {/* <PlayButton file={file} /> */}
  </div>
  )
}
