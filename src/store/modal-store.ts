import {IModalStore} from './store-types'
import {action, computed} from 'easy-peasy';

export const ModalStore: IModalStore = {
    openCreateProjectModal: action((state) => {
        state.modalStates.createProject = true;
    }),

    closeCreateProjectModal: action((state) => {
        state.modalStates.createProject = false;
    }),

    modalStates: {
        createProject: false,
    },
}

// export default new AuthStore()
export default ModalStore
