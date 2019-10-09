import React, {useEffect} from 'react'
import {useStoreActions, useStoreState, Actions, State} from 'easy-peasy'

import {Comment, AudioFile} from '../../types/music-types'
import SongChooserContext, {SongChooserContextValue} from '../../contexts/song-chooser-context'
import SongPlayer from '../../components/song-player/song-player'
import CommentSection from '../../components/comment-section/comment-section'
import { IGlobalStore } from '../../store/store-types'

type ShowSongPageProps = {
  match: {
    params: {id: string}
  },
}

export default function ShowSongPage(props: ShowSongPageProps) {
  const audioFileId = parseInt(props.match.params.id)

  const fetchComments = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.comments.fetchComments)

  useEffect(() => {
    console.log('fetching file ' + audioFileId)
    fetchComments(audioFileId)
    // like comments. display cached data, but also fetch fresh data
  }, [])

  const audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles)
  const audioFile = audioFiles.find((file: AudioFile) => file.id === audioFileId)

  if (!audioFile) {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <div>
      <SongPlayer file={audioFile} />
      <CommentSection audioFile={audioFile} />
    </div>
  )
}
