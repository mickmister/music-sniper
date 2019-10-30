import React, {useRef} from 'react'
import useRouter from 'use-react-router'
import {useStoreActions, Actions} from 'easy-peasy'
import { AudioFile } from '../types/music-types';
import { IGlobalStore } from '../store/store-types';

const useFileUpload = (uploadFile: (f: File) => void): [React.ReactNode, () => void] => {
   const didChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target
      if (files && files[0]) {
        uploadFile(files[0])
      } else {

      }
    }

    const ref = useRef(null)

    const pickFile = () => {
      ref.current.click()
    }

    return [
      <input ref={ref} type='file' style={{display: 'none'}} onChange={didChooseFile} />,
      pickFile,
    ]
  }
}

export const useSongUpload = (callback?: (audiFile: AudioFile) => void): [React.ReactNode, () => void] => {
  const uploadFile = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.songs.uploadFile)
  const {history} = useRouter()

  const didChooseFile = async (file: File) => {
    const uploaded: AudioFile = await uploadFile(file)
    if (uploaded && uploaded.id) {
      history.push(`/songs/${uploaded.id}/play`)
      if (callback) {
        callback(uploaded)
      }
    } else {
      console.log('upload failed')
    }
  }

  const [UploadComponent, pickFile] = useFileUpload(didChooseFile)

  return [
    UploadComponent,
    pickFile,
  ]
}
