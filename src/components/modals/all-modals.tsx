import React from 'react'

import CreateProjectModal from './create-project-modal'
import { useStoreState } from 'easy-peasy'
import { IGlobalStore } from '../../store/store-types'

export default function AllModals() {
    const modalOpenStates = useStoreState((state: IGlobalStore) => state.modals.modalStates.result)

    return (
        <React.Fragment>
            <CreateProjectModal open={modalOpenStates.createProject} />
        </React.Fragment>
    )
}
