import React, {useEffect} from 'react'

import SongChooser from '../../components/song-chooser/song-chooser-container'

export default function ShowSongPage() {
  useEffect(() => {
    // use route param to load data for show page
    // like comments. display cached data, but also fetch fresh data
  }, [])

  return (
    <div>
      <SongChooser />
    </div>
  )
}
