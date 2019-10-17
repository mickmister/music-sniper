import React, {useEffect, useState} from 'react'
import {useStoreActions, useStoreState, Actions, State} from 'easy-peasy'
import Input from '@material-ui/core/Input'

import {Comment, AudioFile, Clip} from '../types/music-types'
import SongPlayer from '../components/song-player/song-player'
import CommentSection from '../components/comment-section/comment-section'
import { IGlobalStore } from '../store/store-types'
import Button from '@material-ui/core/Button'

type ShowSongPageProps = {
  match: {
    params: {id: string}
  },
}

type FormProps = {
  audio_file_id: number
  createClip: (clip: Clip) => Promise<Clip>
}

const ClipForm = (props: FormProps) => {
  const [formState, setFormState] = useState({
    name: 'ssw',
    start: 10,
    end: 20,
  } as Clip)

  const submitForm = (e) => {
    e.preventDefault()

    if (!formState.name || !formState.start || !formState.end) {
      return
    }

    const clip = {...formState, audio_file_id: props.audio_file_id}
    props.createClip(clip).then(() => {
      setFormState({} as Clip)
    })
  }

  return (
    <form onSubmit={submitForm}>
      <h1>iji</h1>
      <Input></Input>
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default function ShowSongPage(props: ShowSongPageProps) {
  const audioFileId = parseInt(props.match.params.id)

  const fetchComments = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.comments.fetchComments)
  const createOrUpdateClip = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.songs.createOrUpdateClip)

  useEffect(() => {
    console.log('fetching file ' + audioFileId)
    fetchComments(audioFileId)
    // like comments. display cached data, but also fetch fresh data
  }, [])

  const audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles)
  const audioFile = audioFiles.find((file: AudioFile) => file.id === audioFileId)

  const clips = useStoreState((state: State<IGlobalStore>) => state.songs.clips).filter(c => audioFile.clip_ids.indexOf(c.id) > -1)

  if (!audioFile) {
    return (
      <h1>Loading</h1>
    )
  }

  const handleCreateClip = (clip: Clip) => {
    return createOrUpdateClip(clip)
  }


  return (
    <div>
      <SongPlayer file={audioFile} />
      <ClipForm createClip={handleCreateClip} audio_file_id={audioFileId} />
      {clips.map(c => (
        <h1>{c.name}</h1>
      ))}
      <CommentSection audioFile={audioFile} />
    </div>
  )
}
