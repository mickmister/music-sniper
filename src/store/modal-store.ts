import {action, Action} from 'easy-peasy'

type ModalStates = {
    createProject: boolean;
}

export interface IModalStore {
    openCreateProjectModal: Action<IModalStore>;
    closeCreateProjectModal: Action<IModalStore>;
    modalStates: ModalStates;
}

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

export default ModalStore
