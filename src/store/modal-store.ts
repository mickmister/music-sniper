import {action, computed} from 'easy-peasy'

import {IModalStore} from './store-types'

export const ModalStore: IModalStore = {
    openCreateProjectModal: action((state) => {
        state.modalStates.createProject = true
    }),

    closeCreateProjectModal: action((state) => {
        state.modalStates.createProject = false
    }),

    modalStates: {
        createProject: false,
    },
}

// export default new AuthStore()
export default ModalStore
