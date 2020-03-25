import React from 'react'
import {State, useStoreState} from 'easy-peasy'
import useRouter from 'use-react-router'

import {IGlobalStore} from '../../store/store-types'
import CommentSection from '../comment-section/comment-section'

import styles from './sidebars.module.scss'

export default function RightSidebar(): JSX.Element {
    const {location} = useRouter()

    const visible = useStoreState((state: State<IGlobalStore>) => state.sidebars.rightSidebarVisible)
    // if (!visible) {
    //     return null
    // }
    const audioFile = useStoreState((state: State<IGlobalStore>) => state.songs.getSelectedAudioFile(location))

    if (location.pathname === '/login') {
        return null
    }

    let content = null
    if (audioFile) {
        content = (
            <div>
                <h2>{'Comments'}</h2>
                <CommentSection audioFile={audioFile}/>
            </div>
        )
    }

    const className = [
        // 'col-lg-3',
        styles.rightSidebar,
    ].join(' ')
    return (
        <div className={className}>
            {content}
        </div>
    )
}
