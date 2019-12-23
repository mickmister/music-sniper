import {action, Action} from 'easy-peasy'

import {Project, Clip} from '../types/music-types'

type ModalStates = {
    createProject: Project | null
    createClip: Clip | null
}

export interface IModalStore {
    openCreateProjectModal: Action<IModalStore, Project | null>
    closeCreateProjectModal: Action<IModalStore>
    openCreateClipModal: Action<IModalStore, Clip | null>
    closeCreateClipModal: Action<IModalStore>
    modalStates: ModalStates
}

export const ModalStore: IModalStore = {
    openCreateProjectModal: action((state, project) => {
        state.modalStates.createProject = project
    }),
    closeCreateProjectModal: action((state) => {
        state.modalStates.createProject = null
    }),

    openCreateClipModal: action((state, clip) => {
        state.modalStates.createClip = clip
    }),
    closeCreateClipModal: action((state) => {
        state.modalStates.createClip = null
    }),

    modalStates: {
        createProject: null,
        createClip: {},
    },
}

export default ModalStore
