import React, {useEffect, useContext} from 'react'

import {Comment} from '../../types/music-types'
import SongChooserContext, {SongChooserContextValue} from '../../contexts/song-chooser-context'
import SongPlayer from '../../components/song-player/song-player'
import CommentSection from '../../components/comment-section/comment-section'

type ShowSongPageProps = {
  match: {
    params: {id: string}
  },
}

export default function ShowSongPage(props: ShowSongPageProps) {
  const audioFileId = parseInt(props.match.params.id)

  useEffect(() => {
    console.log('fetching file ' + audioFileId)
    // use route param to load data for show page
    // like comments. display cached data, but also fetch fresh data
  }, [])

  const {state} = useContext(SongChooserContext) as SongChooserContextValue
  const audioFile = state.audioFiles.find(file => file.id === audioFileId)

  if (!audioFile) {
    return (
      <h1>Loading</h1>
    )
  }

  const comments = [
    {
      id: 1,
      user_id: 1,
      created_at: '',
      text: 'Nice fill! Totally dude, sick fill. Totally dude, sick fill.',
    },
    {
      id: 2,
      user_id: 2,
      created_at: '',
      text: 'Totally dude, sick fill. Totally dude, sick fill. Totally dude, sick fill. Totally dude, sick fill.',
    },
] as Comment[]

  return (
    <div>
      <SongPlayer file={audioFile} />
      <CommentSection comments={comments} />
    </div>
  )
}
