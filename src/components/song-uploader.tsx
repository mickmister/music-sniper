import React from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import {useAction} from 'easy-peasy'

export interface SongUploaderProps {
  selectUploadFile(file: File): void,
  uploadFile(): void
}

export default function SongUpload() {
  const selectUploadFile = useAction(dispatch => dispatch.songs.selectUploadFile)
  const uploadFile = useAction(dispatch => dispatch.songs.uploadFile)

  const selectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target
    if (files && files[0]) {
      selectUploadFile(files[0])
    }
  }

  return (
    <div>
      <input type='file' onChange={selectedFile} />
      <Button bsClass='btn btn-primary' onClick={uploadFile}>{'Upload'}</Button>
    </div>
  )
}
