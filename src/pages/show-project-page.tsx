import React, { useState } from 'react'
import { IGlobalStore } from '../store/store-types'
import { useStoreState, State, useStoreActions, Actions } from 'easy-peasy'
import { AudioFile } from '../types/music-types'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

// import AudioRecorder from '../../components/';

type Props = {
  match: {
    params: {id: string}
  },
}

export default function ShowSongPage(props: Props) {
  const projectId = parseInt(props.match.params.id)
  const project = useStoreState((state: State<IGlobalStore>) => state.projects.projects.find(p => p.id === projectId))

  const [selectedFileId, setSelectedFileId] = useState('')

  let audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles) as AudioFile[]
  let attachedAudioFiles = []

  if (project) {
    const projectAttachments = project.project_attachments.filter(att => att.item_type === 'AudioFile')
    attachedAudioFiles = audioFiles.filter(f => projectAttachments.findIndex(att => f.id === att.item_id) > -1)
    audioFiles = audioFiles.filter(f => attachedAudioFiles.findIndex(f2 => f.id === f2.id) === -1)
  }
  const updateProject = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.projects.createOrUpdateProject)

  const attachAudioFile = () => {
    const f = audioFiles.find(f2 => f2.id === parseInt(selectedFileId))
    const p = {
      ...project,
      project_attachments_attributes: [{
        // id: f.id,
        item_type: 'AudioFile',
        item_id: f.id,
        project_id: project.id,
      }],
    }
    updateProject(p)
  }

  return (
    <div>
      <div>
        {project && <span style={{color: 'yellow'}}>Project {project.id}: {project.name}</span>}
      </div>
      <div>
        {attachedAudioFiles.map(f => (
          <div>
            <Link to={`/songs/${f.id}/play`}><span style={{color: 'yellow'}}>AudioFile {f.id}: {f.file_name}</span></Link>
          </div>
        ))}
        <select value={selectedFileId} onChange={(e) => setSelectedFileId(e.target.value)}>
          <option value=''></option>
          {audioFiles.map(f => (
              <option value={f.id}>{f.file_name}</option>
          ))}
        </select>
        <Button onClick={attachAudioFile}>Attach</Button>
      </div>
    </div>
  )
}
