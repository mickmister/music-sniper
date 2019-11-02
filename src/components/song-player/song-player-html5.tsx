import React from 'react'

import {AudioFile} from '../../types/music-types'
import PlayButton from '../play-button'
import styles from '../song-chooser/song-chooser.module.scss'

type SongPlayerProps = {
    file: AudioFile;
}

export default function SongPlayer(props: SongPlayerProps) {
    const {file} = props

    if (!file) {
        return (
            <div/>
        )
    }

    return (
        <div key={file.id}>
            <p className={styles.songTitle}>
                {file.file_name}
            </p>
            <audio
                src={file.url}
                controls={true}
                style={{width: '100%'}}

                // autoPlay
            />
            {/* <PlayButton file={file} /> */}
        </div>
    )
}
