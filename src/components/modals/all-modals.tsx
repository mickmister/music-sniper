import React from 'react'
import {useStoreState} from 'easy-peasy'

import {IGlobalStore} from '../../store/store-types'

import CreateProjectModal from './create-project-modal/create-project-modal'
import CreateClipModal from './create-clip-modal/create-clip-modal'

export default function AllModals() {
    const modalOpenStates = useStoreState((state: IGlobalStore) => state.modals.modalStates)
    const {createProject, createClip} = modalOpenStates

    return (
        <React.Fragment>
            <CreateProjectModal
                opened={Boolean(createProject)}
                project={createProject}
            />
            <CreateClipModal
                opened={Boolean(modalOpenStates.createClip)}
                clip={createClip}
            />
        </React.Fragment>
    )
}
