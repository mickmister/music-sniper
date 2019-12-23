import React from 'react'
import {useStoreActions, Actions} from 'easy-peasy'

import {IGlobalStore} from '../../../store/store-types'
import {Project} from '../../../types/music-types'

import Modal from '../modal'

import {CreateProjectModalInner} from './create-project-modal-inner'

type Props = {
    opened: boolean
    project: Project | null
}

export default function CreateProjectModal(props: Props) {
    const closeModal = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.modals.closeCreateProjectModal)

    return (
        <Modal
            opened={props.opened}
            closeModal={closeModal}
        >
            <h1>{'Create Project'}</h1>
            <CreateProjectModalInner closeModal={closeModal}/>
        </Modal>
    )
}
