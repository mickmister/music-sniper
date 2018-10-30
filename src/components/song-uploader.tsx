import React from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'

export interface SongUploadProps {
  onChange(file: File): void,
  url: string,
  uploadFile(): void
}

export default class SongUpload extends React.Component<SongUploadProps, any> {

  selectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target
    if (files && files[0]) {
      this.props.selectedFile(files[0])
    }
  }

  render() {
    return (
      <div>
        <input type='file' onChange={this.selectedFile} />
        <Button bsClass='btn btn-primary' onClick={this.props.uploadFile}>{'Upload'}</Button>
      </div>
    )
  }
}
