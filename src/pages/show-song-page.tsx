import React, {useEffect, useState, useCallback} from 'react'
import {useStoreActions, useStoreState, Actions, State} from 'easy-peasy'
import Input from '@material-ui/core/Input'

import Button from '@material-ui/core/Button'

import {Comment, AudioFile, Clip, Percentage} from '../types/music-types'
import SongPlayer from '../components/song-player/song-player'
import CommentSection from '../components/comment-section/comment-section'
import {IGlobalStore} from '../store/store-types'

import {displayTime} from '../util/display-time'

type ShowSongPageProps = {
    match: {
        params: {id: string}
    },
}

type FormProps = {
    audio_file_id: number
    createClip: (clip: Clip) => Promise<Clip>
}

const emptyClip = {
    name: '',
    start: 0,
    end: 0,
}

const ClipForm = (props: FormProps) => {
    const [formState, setFormState] = useState(emptyClip)

    const submitForm = (e) => {
        e.preventDefault()

        if (!formState.name) {
            return
        }

        if (formState.start >= formState.end) {
            return
        }

        const clip = {...formState, audio_file_id: props.audio_file_id}
        props.createClip(clip).then(() => {
            setFormState(emptyClip)
        })
    }

    const changedFormValue = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number = e.target.value
        if (name === 'start' || name === 'end') {
            value = parseInt(value)
        }
        setFormState({...formState, [name]: value})
    }

    return (
        <form
            onSubmit={submitForm}
            style={{backgroundColor: 'yellow'}}
        >
            <Input
                onChange={changedFormValue('name')}
                value={formState.name}
            />
            <Input
                onChange={changedFormValue('start')}
                value={formState.start}
                type='number'
            />
            <Input
                onChange={changedFormValue('end')}
                value={formState.end}
                type='number'
            />
            <Button type='submit'>{'Submit'}</Button>
        </form>
    )
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
    const seekActiveSprite = useStoreActions((state: Actions<IGlobalStore>) => state.songs.seekActiveSprite)

    if (!audioFile) {
        return (
            <h1>{'Loading'}</h1>
        )
    }

    const handleCreateClip = (clip: Clip) => {
        return createOrUpdateClip(clip)
    }

    // <SongPlayer file={audioFile} />
    return (
        <div>
            <SongPlayer
                spriteInfo={spriteInfo}
                onSeek={seekActiveSprite}
            />
            <ClipForm
                createClip={handleCreateClip}
                audio_file_id={audioFileId}
            />
            {spriteInfo && (
                <div>
                    <h1>{displayTime(spriteInfo.spritePosition)}</h1>
                </div>
            )}
            {clips.map((c) => (
                <div key={c.id}>
                    <h1>{c.name} {c.start} {c.end}</h1>
                    <button onClick={() => playClip(c)}>
                        {spriteInfo && spriteInfo.section === c && spriteInfo.playing ? 'Pause' : 'Play'}
                    </button>
                </div>
            ))}
            <CommentSection audioFile={audioFile}/>
        </div>
    )
}
