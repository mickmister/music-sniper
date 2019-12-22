import React from 'react'

import {AudioFile} from '../../types/music-types'
import PlayButton from '../play-button'
import styles from '../song-chooser/song-chooser.module.scss'

type SongPlayerHTML5Props = {
    file: AudioFile;
}

export default function SongPlayerHTML5(props: SongPlayerHTML5Props) {
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
