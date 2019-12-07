import React from 'react'
import {Card, Icon} from 'semantic-ui-react'
import {useStoreState, State} from 'easy-peasy'

import {IGlobalStore} from '../../store/store-types'
import styles from './dashboard.module.scss'

import DashboardCard from './dashboard-card'
import {Link} from 'react-router-dom'

const folders = [
    {
        id: 1,
        name: '2019 October Jams',
        description: 'Jams recorded in October of 2019',
        audio_files: [1, 3],
    },
    {
        id: 2,
        name: '2019 November Jams',
        description: 'Jams recorded in November of 2019',
        audio_files: [4, 5],
    },
    {
        id: 3,
        name: '2019 October Jams',
        description: 'Jams recorded in October of 2019',
        audio_files: [1, 3],
    },
    {
        id: 4,
        name: '2019 November Jams',
        description: 'Jams recorded in November of 2019',
        audio_files: [4, 5],
    },
    {
        id: 5,
        name: '2019 October Jams',
        description: 'Jams recorded in October of 2019',
        audio_files: [1, 3],
    },
    {
        id: 6,
        name: '2019 November Jams',
        description: 'Jams recorded in November of 2019',
        audio_files: [4, 5],
    },
]

export default function Dashboard() {
    const audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles)
    const audioFileIdsInFolders = folders.map((folder) => folder.audio_files).flat()
    const audioFilesNotInFolders = audioFiles.filter((audioFile) => !audioFileIdsInFolders.includes(audioFile.id))

    return (
        <div className={styles.container}>
            {folders.map((f) => (
                <DashboardCard
                    key={f.id}
                    folder={f}
                />
            ))}
            {/* {audioFilesNotInFolders.map((audioFile) => (
                <Link
                    to={`/songs/${audioFile.id}/play`}
                    key={audioFile.id}
                >
                    {audioFile.file_name}
                </Link>
            ))} */}
        </div>
    )
}
