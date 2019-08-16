import React from 'react'

import SongChooser from '../../components/song-chooser/song-chooser'
import AudioRecorder from '../../components/audio_recorder/audio_recorder';

export default function SongChooserPage() {

  return (
    <div>
      <AudioRecorder />
      <SongChooser />
    </div>
  )
}
