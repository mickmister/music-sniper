import React, {useRef} from 'react'
import useRouter from 'use-react-router'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import {useAction} from 'easy-peasy'
import { AudioFile } from '../types/music-types';

export interface SongUploaderProps {
  selectUploadFile(file: File): void,
  uploadFile(): void
}

export default function SongUpload() {
  const {history} = useRouter()

  const uploadFile = useAction(dispatch => dispatch.songs.uploadFile)

  const didChooseFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target
    if (files && files[0]) {
      const uploaded: AudioFile = await uploadFile(files[0])
      if (uploaded) {
        history.push(`/songs/${uploaded.id}/play`)
      }
    }
  }

  const pickFile = () => {
    hiddenFileInput.current.click()
  }

  const hiddenFileInput = useRef(null)

  return (
    <div>
      <input ref={hiddenFileInput} type='file' style={{display: 'none'}} onChange={didChooseFile} />
      <Button bsClass='btn btn-primary' onClick={pickFile}>Upload Song</Button>
    </div>
  )
}
