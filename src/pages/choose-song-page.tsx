import React from 'react'

import styles from '../styles/page.module.scss'

import SongChooser from '../components/song-chooser/song-chooser'
import AudioRecorder from '../components/audio_recorder/audio_recorder'

export default function SongChooserPage() {
    return (
        <div className={styles.container}>
            <AudioRecorder/>
            <SongChooser/>
        </div>
    )
}
