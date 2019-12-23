import React, {useEffect} from 'react'
import {useStoreActions, useStoreState, Actions, State} from 'easy-peasy'

import {PlayButton, PauseButton} from 'react-player-controls'

import {AudioFile, Clip} from '../types/music-types'
import {IGlobalStore} from '../store/store-types'
import {displayTime} from '../util/display-time'

import SongPlayerHTML5 from '../components/song-player/song-player-html5'
import CommentSection from '../components/comment-section/comment-section'
import ClipForm from '../components/clip-form/clip-form'
import ClipTable from '../components/tables/clip_table'

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

    return (
        <div>
            <div style={{height: '200px'}}>
                <SongPlayerHTML5
                    file={audioFile}
                />
            </div>
            {/* <ClipForm
                createClip={handleCreateClip}
                audio_file_id={audioFileId}
            /> */}
            <h2>{'Display clips in a table. Display clip form as first row of table.'}</h2>
            <ClipTable clips={clips}/>
            <CommentSection audioFile={audioFile}/>
        </div>
    )
}
