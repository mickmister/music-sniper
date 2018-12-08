import React, {useContext} from 'react'
import {Howl} from 'howler'

import {AudioFile} from '../../types/music-types'
import SongChooserContext, {SongChooserContextValue} from '../../contexts/song-chooser-context'

import SongLoader from '../../services/song-loader'
import SongChooser from './song-chooser'

function SongChooserContainer() {
  const {state, actions} = useContext(SongChooserContext) as SongChooserContextValue

  const songUploaderProps = {
    selectedFile: state.selectedFile,
    uploadFile: actions.uploadFile,
    selectUploadFile: actions.selectUploadFile,
  }
  return (
    <SongChooser {...state} {...actions} songUploaderProps={songUploaderProps} />
  )
}

export default SongChooserContainer
