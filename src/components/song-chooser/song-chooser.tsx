import React from 'react'
import {Button, Grid, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useStore} from 'easy-peasy'

import SongUploader, {SongUploaderProps} from '../song-uploader'
import styles from './song-chooser.module.scss'
import {AudioFile} from '../../types/music-types'
import PlayButton from '../play-button'

type FileSquareProps = {
  file: AudioFile,
}

const FileSquare = (props: FileSquareProps) => {
  const {file} = props

  return (
  <div key={file.id} className={styles.browseGridCell}>
    <p className={styles.songTitle}>
      <Link to={`/songs/${file.id}/play`}>
        {file.file_name}
      </Link>
    </p>
    <PlayButton file={file} />
  </div>
  )
}

type SongChooserProps = {
  // songUploaderProps: SongUploaderProps,
  // audioFiles: AudioFile[],
}

export default function SongChooser(props: SongChooserProps) {
  const audioFiles = useStore(state => state.songs.audioFiles)

  return (
    <div>
      <SongUploader />
      <Grid bsClass={styles.browseGrid}>
        <Row>
          {audioFiles.map((file: AudioFile) => (
            <Col lg={4} md={6} sm={6} xs={12} key={file.id}>
              <FileSquare
                file={file}
              />
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  )
}
