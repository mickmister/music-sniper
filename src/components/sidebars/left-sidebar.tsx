import React from 'react'
import {State, useStoreState, useStoreActions, Actions} from 'easy-peasy'
import {Link} from 'react-router-dom'

import {IGlobalStore} from '../../store/store-types'
import {AudioFile} from '../../types/music-types'

import styles from './sidebars.module.scss'
import useRouter from 'use-react-router'
import {useSongUpload} from '../../hooks/hooks'

export default function LeftSidebar(): JSX.Element {
    const {location} = useRouter()

    const visible = useStoreState((state: State<IGlobalStore>) => state.sidebars.leftSidebarVisible)
    // if (!visible) {
    //     return null
    // }

    const [SongUpload, chooseAudioFile] = useSongUpload()
    const handleUploadAudioFileClick = () => {
        chooseAudioFile()
    }

    const setSelectedEntity = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.sidebars.setSelectedEntity)
    const selectedEntity = useStoreState((dispatch: State<IGlobalStore>) => dispatch.sidebars.selectedEntity)
    const clickedAudioFile = (f: AudioFile) => {
        setSelectedEntity(f)
    }

    const audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles)
    const audioFileComponents = audioFiles.map((f) => {
        const url = '/songs/' + f.id + '/play'
        let className = styles.entity
        if (location.pathname === url || (selectedEntity && f.id === selectedEntity.id)) {
            className += ' ' + styles.selectedEntity
        }
        return (
            <Link to={url} key={f.id} className={className} onClick={() => clickedAudioFile(f)}>
                {f.file_name}
            </Link>
        )
    })

    if (location.pathname === '/login') {
        return null
    }

    const className = [
        // 'col-lg-2',
        styles.leftSidebar,
    ].join(' ')
    return (
        <div className={className}>
            <a className={styles.entity + ' ' + styles.uploadFile} onClick={handleUploadAudioFileClick}>
                {'Upload File'}
                {SongUpload}
            </a>
            {audioFileComponents}
        </div>
    )
}
