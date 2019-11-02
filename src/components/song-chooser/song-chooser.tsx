import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useStoreState, State} from 'easy-peasy'

import {AudioFile, Comment} from '../../types/music-types'
import PlayButton from '../play-button'

import styles from './song-chooser.module.scss'

type FileSquareProps = {
    file: AudioFile;
    comments: Comment[];
}

const FileSquare = (props: FileSquareProps) => {
    const {file, comments} = props

    return (
        <div
            key={file.id}
            className={styles.browseGridCell}
        >
            <p className={styles.songTitle}>
                <Link to={`/songs/${file.id}/play`}>
                    {file.file_name}
                </Link>
            </p>
            <Link to={`/songs/${file.id}/play`}>
                <span className={styles.numComments}>{comments.length} Comments</span>
            </Link>
            <PlayButton file={file}/>
        </div>
    )
}

type SongChooserProps = {

    // songUploaderProps: SongUploaderProps,
    // audioFiles: AudioFile[],
}

export default function SongChooser(props: SongChooserProps) {
    const audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles)
    const comments = useStoreState((state: State<IGlobalStore>) => state.comments.items)

    return (
        <div>
            <Grid bsClass={styles.browseGrid}>
                <Row>
                    {audioFiles.map((file: AudioFile) => (
                        <Col
                            lg={4}
                            md={6}
                            sm={6}
                            xs={12}
                            key={file.id}
                        >
                            <FileSquare
                                file={file}
                                comments={comments.filter((comment: Comment) => comment.audio_file_id === file.id)}
                            />
                        </Col>
                    ))}
                </Row>
            </Grid>
        </div>
    )
}
