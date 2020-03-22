import {action, Action} from 'easy-peasy'

import {Project, Clip} from '../types/music-types'
import {AttachProps} from '../types/props'

type ModalStates = {
    createProject: Project | null
    createClip: Clip | null
    attach: AttachProps | null
}

export interface IModalStore {
    openCreateProjectModal: Action<IModalStore, Project | null>
    closeCreateProjectModal: Action<IModalStore>
    openCreateClipModal: Action<IModalStore, Clip | null>
    closeCreateClipModal: Action<IModalStore>
    openAttachModal: Action<IModalStore, AttachProps | null>
    closeAttachModal: Action<IModalStore>

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

    openAttachModal: action((state, attachProps) => {
        state.modalStates.attach = attachProps
    }),
    closeAttachModal: action((state) => {
        state.modalStates.attach = null
    }),

    modalStates: {
        createProject: null,
        createClip: null,
        attach: null,
    },
}

export default ModalStore
