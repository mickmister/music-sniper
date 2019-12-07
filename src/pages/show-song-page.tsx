import React, {useEffect} from 'react'
import {useStoreActions, useStoreState, Actions, State} from 'easy-peasy'

import {PlayButton, PauseButton} from 'react-player-controls'

import {AudioFile, Clip} from '../types/music-types'
import {IGlobalStore} from '../store/store-types'
import {displayTime} from '../util/display-time'

import SongPlayer from '../components/song-player/song-player'
import CommentSection from '../components/comment-section/comment-section'
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

    // const clips = useStoreState((state: State<IGlobalStore>) => state.songs.clips).filter(c => c.audio_file_id === audioFileId)

    useEffect(() => {
        console.log('fetching file ' + audioFileId)
        fetchComments(audioFileId)
        fetchClips(audioFileId)

    // like comments. display cached data, but also fetch fresh data
    }, [])

    const audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles)
    const audioFile = audioFiles.find((file: AudioFile) => file.id === audioFileId)

    const clips = useStoreState((state: State<IGlobalStore>) => state.songs.clips).filter((c) => Boolean(audioFile) && audioFile.clip_ids.indexOf(c.id) > -1)
    const playClip = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.songs.playClip)
    const spriteInfo = useStoreState((state: State<IGlobalStore>) => state.songs.activeSpriteInfo)

    if (!audioFile) {
        return (
            <h1>{'Loading'}</h1>
        )
    }

    const handleCreateClip = (clip: Clip) => {
        return createOrUpdateClip(clip)
    }

    const makeClipComponent = (c: Clip): JSX.Element => {
        const play = async () => {
            const sprite = await playClip(c)
            sprite.play()
        }

        let button = null
        button = (
            <PlayButton
                isEnabled={true}
                onClick={play}
            />
        )

        if (spriteInfo && spriteInfo.section === c && spriteInfo.playing) {
            button = <PauseButton onClick={play}/>
        }

        return (
            <div
                key={c.id}
                style={{
                    border: '4px solid',
                    width: '500px',
                    borderRadius: '10px',
                    // borderColor: 'black',
                    margin: '20px',
                    padding: '10px',
                }}
            >
                {button}
                <span>{c.name} {displayTime(c.start_time)} {'-'} {displayTime(c.end_time)}</span>
            </div>
        )
    }

    return (
        <div>
            <ClipForm
                createClip={handleCreateClip}
                audio_file_id={audioFileId}
            />
            {clips.map(makeClipComponent)}
            <CommentSection audioFile={audioFile}/>
        </div>
    )
}
