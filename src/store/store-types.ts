import {Thunk} from 'easy-peasy'

import {IAuthStore} from './auth-store'
import {IUserStore} from './user-store'
import {ISongStore} from './song-store'
import {IModalStore} from './modal-store'
import {IProjectStore} from './project-store'
import {IFolderStore} from './folder-store'
import {ICommentStore} from './comment-store'

export interface IStoreInit {
    init: Thunk<IStoreInit, void, void, IGlobalStore>,
}

export interface ISettingsStore {}

export type IGlobalStore = {
    store: IStoreInit,
    auth: IAuthStore,
    users: IUserStore,
    songs: ISongStore,
    projects: IProjectStore,
    folders: IFolderStore,
    comments: ICommentStore,
    settings: ISettingsStore,
    modals: IModalStore,
}
