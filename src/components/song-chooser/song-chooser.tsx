import React from 'react'

class SongChooser extends React.PureComponent {
  renderFile = (file => (
    <div key={file.id}>
      <pre>{JSON.stringify(file, null, 2)}</pre>
      <a onClick={() => this.clickedFile(file)}>{file.id}</a>
    </div>
  ))

  clickedFile = (file) => {
    this.props.playFile(file)
  }

  render() {
    return (
      <div>
        <h1>SongChooser</h1>
        {this.props.audio_files.map(this.renderFile)}
      </div>
    )
  }
}

export default SongChooser
