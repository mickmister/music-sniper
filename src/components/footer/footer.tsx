import React from 'react'
import {useStore} from 'easy-peasy'

import styles from './footer.module.scss'
import SongPlayer from '../song-player/song-player';

export default function Footer() {
  const song = useStore(state => state.songs.currentPlayingSong)

  if (location.pathname === '/login') {
    return <div className={styles.footer} />
  }

  return (
    <div className={styles.footer}>
      <SongPlayer file={song} />
    </div>
  )
}
