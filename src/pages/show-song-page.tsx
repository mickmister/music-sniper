import React, {useEffect} from 'react'
import {useStoreActions, useStoreState, Actions, State} from 'easy-peasy'

import {AudioFile, Clip} from '../types/music-types'
import {IGlobalStore} from '../store/store-types'

import styles from '../styles/page.module.scss'
import SongPlayerHTML5 from '../components/song-player/song-player-html5'
import CommentSection from '../components/comment-section/comment-section'
import ClipTable from '../components/tables/clip_table'
import ClipForm from '../components/clip-form/clip-form'

type ShowSongPageProps = {
    match: {
        params: {id: string}
    },
}

export default function ShowSongPage(props: ShowSongPageProps) {
    const audioFileId = parseInt(props.match.params.id)

    const fetchComments = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.comments.fetchComments)
    const createOrUpdateClip = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.songs.createOrUpdateClip)

    const fetchClips = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.songs.fetchClips)

    const [showClipForm, setClipFormVisibility] = React.useState(false)

    // const clips = useStoreState((state: State<IGlobalStore>) => state.songs.clips).filter(c => c.audio_file_id === audioFileId)

    useEffect(() => {
        console.log('fetching file ' + audioFileId)
        fetchComments(audioFileId)
        fetchClips(audioFileId)
    }, [])

    const audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles)
    const audioFile = audioFiles.find((file: AudioFile) => file.id === audioFileId)

    const clips = useStoreState((state: State<IGlobalStore>) => state.songs.clips).filter((c) => Boolean(audioFile) && audioFile.clip_ids.indexOf(c.id) > -1)

    if (!audioFile) {
        return (
            <h1>{'Loading'}</h1>
        )
    }

    const handleCreateClip = (clip: Clip) => {
        return createOrUpdateClip(clip)
    }

    const showHideClipFormButton = (
        <button onClick={() => setClipFormVisibility(!showClipForm)}>
            {showClipForm ? 'Hide Clip Form' : 'Show Clip Form'}
        </button>
    )

    return (
        <div className={styles.container}>
            <h3>{audioFile.file_name}</h3>
            <div style={{height: '140px', width: '100%'}}>
                <SongPlayerHTML5
                    file={audioFile}
                />
            </div>
            <div style={{width: '100%'}}>
                {showHideClipFormButton}
                {showClipForm && (
                    <ClipForm
                        createClip={handleCreateClip}
                        audio_file_id={audioFileId}
                    />
                )}
            </div>
            <h2>{'Clips'}</h2>
            <ClipTable clips={clips}/>
        </div>
    )
}
