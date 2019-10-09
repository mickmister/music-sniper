import {IModalStore} from '../store-types'
import { action } from 'easy-peasy';

export const ModalStore: IModalStore = {
    openedCreateProjectModal: false,
    openCreateProjectModal: action((state) => {
        state.openedCreateProjectModal = true;
    }),
    closeCreateProjectModal: action((state) => {
        state.openedCreateProjectModal = false;
    }),
}

// export default new AuthStore()
export default ModalStore
