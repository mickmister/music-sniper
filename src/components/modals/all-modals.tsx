import React from 'react'

import CreateProjectModal from './create-project-modal'
import { useStoreState } from 'easy-peasy'
import { IGlobalStore } from '../../store/store-types'

export default function AllModals() {
    const openedCreateProjectModal = useStoreState((state: IGlobalStore) => state.modals.openedCreateProjectModal)

    const modalOpenStates = {
        createProject: openedCreateProjectModal,
    }

    return (
        <React.Fragment>
            <CreateProjectModal open={modalOpenStates.createProject} />
        </React.Fragment>
    )
}
