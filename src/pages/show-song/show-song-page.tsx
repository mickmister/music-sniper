import React, {useEffect, useContext} from 'react'

import SongChooserContext, {SongChooserContextValue} from '../../contexts/song-chooser-context'
import SongPlayer from '../../components/song-player/song-player'
import CommentSection from '../../components/comment-section/comment-section'

export default function ShowSongPage(props) {
  const audioFileId = parseInt(props.match.params.id)

  useEffect(() => {
    console.log('fetching file ' + audioFileId)
    // use route param to load data for show page
    // like comments. display cached data, but also fetch fresh data
  }, [])

  const {state, actions} = useContext(SongChooserContext) as SongChooserContextValue
  const audioFile = state.audioFiles.find(file => file.id === audioFileId)

  if (!audioFile) {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <div>
      <SongPlayer file={audioFile} />
      <CommentSection comments={['hey']} />
    </div>
  )
}
