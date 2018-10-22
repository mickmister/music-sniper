import React from 'react'

import SongChooser from '../../components/song-chooser/song-chooser-container'

export interface SongChooserPageProps {
}

export interface SongChooserPageState {
}

export default class SongChooserPage extends React.Component<SongChooserPageProps, SongChooserPageState> {
  constructor(props: SongChooserPageProps) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
         <SongChooser />
      </div>
    )
  }
}
