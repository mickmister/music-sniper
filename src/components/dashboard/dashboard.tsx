import React from 'react'
import {useStoreState, State} from 'easy-peasy'

import {IGlobalStore} from '../../store/store-types'
import {FolderStoreState} from '../../store/folder-store'
import {Folder} from '../../types/music-types'

import FolderTable from '../tables/folder-table'
import AudioFileTable from '../tables/audio_file_table'
import ClipTable from '../tables/clip_table'
import ProjectTable from '../tables/project_table'

import DashboardCard from './dashboard-card'

const useFolderPicker = (folderId?: number) => {
    const [state, setState] = React.useState(folderId)

    return [state, setState] as [number, (id: number) => {}]
}

export default function Dashboard() {
    // const audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles)
    // const audioFileIdsInFolders = folders.map((folder) => folder.audio_files).flat()

    const [folderId, setFolderId] = useFolderPicker(1)

    const folderStore = new FolderStoreState()
    const folder = folderStore.getFolder(folderId)
    const parentFolder = folderStore.getParentFolder(folderId)
    const childFolders = folderStore.getChildFolders(folderId)
    const folderItems = folderStore.getFolderItems(folderId)

    const audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles)
    const clips = useStoreState((state: State<IGlobalStore>) => state.songs.clips)
    const projects = useStoreState((state: State<IGlobalStore>) => state.projects.projects)

    return (
        <>
            <h1>{'Projects'}</h1>
            <ProjectTable projects={projects}/>

            <div>
                <h1>{'Folders'}</h1>
                {folder && (
                    <div>
                        <h3>{folder.name}</h3>
                        <p>{folder.description}</p>
                    </div>
                )}
            </div>
            <FolderTable
                folder={folder}
                childFolders={childFolders}
                folderItems={folderItems}
                setFolderId={setFolderId}
                parentFolder={parentFolder}
            />

            <h2>{'Audio Files'}</h2>

            <AudioFileTable
                audioFiles={audioFiles}
            />

            <h2>{'Clips'}</h2>

            <ClipTable
                clips={clips}
            />
            {/* {folders.map((f) => (
                <DashboardCard
                    key={f.id}
                    folder={f}
                />
            ))} */}
            {/* {audioFilesNotInFolders.map((audioFile) => (
                <Link
                    to={`/songs/${audioFile.id}/play`}
                    key={audioFile.id}
                >
                    {audioFile.file_name}
                </Link>
            ))} */}
        </>
    )
}
