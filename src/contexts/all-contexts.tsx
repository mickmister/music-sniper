import React from 'react'

import {SongChooserProvider} from './song-chooser-context'

export default function AllContexts(props: any) {
  return (
    <SongChooserProvider>
      {props.children}
    </SongChooserProvider>
  )
}
