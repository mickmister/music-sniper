import {action, Action} from 'easy-peasy'

import {Commentable, Entity} from '../types/music-types'

export type ISidebarStore = {

    //LHS
    leftSidebarVisible: boolean
    selectedEntity: Entity
    setSelectedEntity: Action<ISidebarStore, Entity>

    // RHS
    rightSidebarVisible: boolean
    selectedCommentable: Commentable
    setSelectedCommentable: Action<ISidebarStore, Commentable>
}

const SidebarStore: ISidebarStore = {
    leftSidebarVisible: false,
    selectedCommentable: null,
    setSelectedCommentable: action((state, commentable) => {
        state.selectedCommentable = commentable
    }),
    rightSidebarVisible: false,
    selectedEntity: null,
    setSelectedEntity: action((state, entity) => {
        state.selectedEntity = entity
    }),
}

export default SidebarStore
