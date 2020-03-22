import React, {useState} from 'react'
import {useStoreState, State, useStoreActions, Actions} from 'easy-peasy'

import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

import styles from '../styles/page.module.scss'

import {AudioFile, ModelNames} from '../types/music-types'
import {IGlobalStore} from '../store/store-types'
import AudioFileTable from '../components/tables/audio_file_table'

// import AudioRecorder from '../../components/';

type Props = {
    match: {
        params: {id: string}
    },
}

export default function ShowSongPage(props: Props) {
    const projectId = parseInt(props.match.params.id)
    const project = useStoreState((state: State<IGlobalStore>) => state.projects.projects.find((p) => p.id === projectId))

    const [selectedFileId, setSelectedFileId] = useState('')

    const att = useStoreState((state: State<IGlobalStore>) => state.projects.getProjectAttachments)(projectId)
    const audioFiles = att.filter((a) => a.item_type === ModelNames.AudioFile).map((a) => a.entity as AudioFile)
    const clips = att.filter((a) => a.item_type === ModelNames.Clip).map((a) => a.entity as Clip)

    const updateProject = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.projects.createOrUpdateProject)
    const closeAttachModal = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.modals.closeAttachModal)

    if (!project) {
        return <p>{'Loading'}</p>
    }

    const attachAudioFileold = () => {
        const f = audioFiles.find((f2) => f2.id === parseInt(selectedFileId))
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

    const attachAudioFile = async (f: AudioFile) => {
        const p = {
            ...project,
            project_attachments_attributes: [{
                item_type: ModelNames.AudioFile,
                item_id: f.id,
                project_id: project.id,
            }],
        }
        await updateProject(p)
        closeAttachModal()
    }

    return (
        <div className={styles.container}>
            <div>
                {project && <span style={{color: 'yellow'}}>{'Project '} {project.id}{': '}{project.name}</span>}
            </div>
            <div>
                {/* <select
                    value={selectedFileId}
                    onChange={(e) => setSelectedFileId(e.target.value)}
                >
                    <option value=''/>
                    {audioFiles.map((f) => (
                        <option
                            key={f.id}
                            value={f.id}
                        >
                            {f.file_name}
                        </option>
                    ))}
                </select> */}
                {/* <Button onClick={attachAudioFile}>{'Attach'}</Button> */}
            </div>
            <AudioFileTable
                audioFiles={audioFiles}
                attachProps={{
                    title: `Attach to ${project.name}`,
                    onSubmit: attachAudioFile,
                    items: [],
                }}
            />
        </div>
    )
}
