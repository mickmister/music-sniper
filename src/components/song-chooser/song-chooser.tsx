import React from 'react'
import {Button} from 'react-bootstrap'

import SongUploader from '../song-uploader'

interface AudioFile {
  id: number,
  url: string,
  file_name: string,
}

interface SongChooserProps {
  selectedUploadFile: (file: File) => void,
  playFile: (audioFile: AudioFile) => void,
  songUploaderProps: SongUploaderProps,
}

class SongChooser extends React.PureComponent<SongChooserProps> {
  renderFile = (file: AudioFile) => (
    <div key={file.id}>
      <h2>{file.file_name}</h2>
      <Button bsClass='btn btn-primary' bsSize='large' onClick={() => this.clickedFile(file)}>Play</Button>
    </div>
  )

  clickedFile = (file: AudioFile) => {
    this.props.playFile(file)
  }

  selectedUploadFile = (file: File) => {
    console.log(file)
  }

  uploadFile = () => {

  }

  render() {
    return (
      <div>
        <SongUploader {...this.props.songUploaderProps} />
        {this.props.audio_files.map(this.renderFile)}
      </div>
    )
  }
}

export default SongChooser
