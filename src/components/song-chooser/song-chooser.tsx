import React from 'react'
import {Button, Grid, Row, Col} from 'react-bootstrap'

import SongUploader, {SongUploaderProps} from '../song-uploader'
import styles from './song-chooser.module.scss'
import { AudioFile } from '../../types/music-types'

interface SongChooserProps {
  playFile: (audioFile: AudioFile) => void,
  pauseFile: (audioFile: AudioFile) => void,
  gotoShowSongPage: (audioFile: AudioFile) => void,
  songUploaderProps: SongUploaderProps,
  audioFiles: AudioFile[],
}

class SongChooser extends React.PureComponent<SongChooserProps> {
  renderFile = (file: AudioFile) => {
    const playing = file.playing
    const buttonLabel = file.loading ? 'Loading' : (playing ? 'Pause' : 'Play')
    const playFunc = playing ? this.props.pauseFile : this.props.playFile
    return (
    <div key={file.id} className={styles.browseGridCell}>
      <p className={styles.songTitle}>{file.file_name}</p>
      <Button bsClass={`btn btn-primary ${styles.playButton}`} bsSize='large' onClick={() => playFunc(file)} disabled={file.loading}>
        {buttonLabel}
      </Button>
    </div>
    )
  }

  clickedSongTitle = (file: AudioFile) => {
    this.props.gotoShowSongPage(file)
  }

  render() {
    return (
      <div>
        <SongUploader {...this.props.songUploaderProps} />
        <Grid bsClass={styles.browseGrid}>
          <Row>
            {this.props.audioFiles.map((file: AudioFile) => (
              <Col lg={4} md={6} sm={6} xs={12} key={file.id}>
                {this.renderFile(file)}
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    )
  }
}

export default SongChooser
