import React from 'react'
import {useStoreState} from 'easy-peasy'

import {IGlobalStore} from '../../store/store-types'

import CreateProjectModal from './create-project-modal'

export default function AllModals() {
    const modalOpenStates = useStoreState((state: IGlobalStore) => state.modals.modalStates)

    return (
        <React.Fragment>
            <CreateProjectModal open={modalOpenStates.createProject}/>
        </React.Fragment>
    )
}
