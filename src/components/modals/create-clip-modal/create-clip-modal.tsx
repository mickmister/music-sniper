import React from 'react'
import {useStoreActions, Actions} from 'easy-peasy'

import {IGlobalStore} from '../../../store/store-types'
import {Clip} from '../../../types/music-types'

import Modal from '../modal'

import CreateClipModalInner from './create-clip-modal-inner'

type Props = {
    opened: boolean
    clip: Clip | null
}

export default function CreateClipModal(props: Props) {
    const closeModal = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.modals.closeCreateClipModal)

    return (
        <Modal
            opened={props.opened}
            closeModal={closeModal}
        >
            <CreateClipModalInner
                clip={props.clip}
                closeModal={closeModal}
            />
        </Modal>
    )
}
