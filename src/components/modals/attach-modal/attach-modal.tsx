import React from 'react'
import {useStoreActions, Actions} from 'easy-peasy'

import {IGlobalStore} from '../../../store/store-types'
import {AttachProps} from '../../../types/props'

import Modal from '../modal'

import AttachModalInner from './attach-modal-inner'

type Props = AttachProps & {
    opened: boolean
}

export default function AttachModal(props: Props) {
    const closeModal = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.modals.closeAttachModal)

    return (
        <Modal
            opened={props.opened}
            closeModal={closeModal}
        >
            <AttachModalInner
                {...props}
            />
        </Modal>
    )
}
