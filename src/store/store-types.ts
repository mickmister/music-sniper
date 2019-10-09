import { Action, Thunk, Select } from 'easy-peasy'
import { AuthStore } from './auth/auth-store'
import { CommentStore } from './comment/comment-store'
import { UserStore } from './user-store'
import { User } from './user-store';
import { Project } from '../types/music-types';
import { AxiosResponse, AxiosPromise } from 'axios';

export interface IStoreInit {
  init: Thunk<IStoreInit, void, void, IGlobalStore>,
}

export interface ISettingsStore {

}

export interface IAuthStore {
  authToken: string | null
}

export interface IModalStore {
  openedCreateProjectModal: boolean,
  openCreateProjectModal: Action<IModalStore>,
  closeCreateProjectModal: Action<IModalStore>,
}

export interface IUserStore {
  users: User[],
  fetchUsers: Thunk<IUserStore, void, void, IGlobalStore>,
  addUsers: Action<IUserStore, User[]>,

  currentUserId: number,
  currentUser: Select<IUserStore, User>,
  setCurrentUser: Action<IUserStore, User>,
  uploadAvatar: Thunk<IUserStore, File, void, IGlobalStore>,
}

export interface ISongStore {
  fetchAudioFiles: Thunk<ISongStore, void, void, IGlobalStore>,
}

export interface ICommentStore {
  fetchComments: Thunk<ICommentStore, void, void, IGlobalStore>,
}

export interface IProjectStore {
  projects: Project[]
  storeProjects: Action<IProjectStore, Project[]>
  createOrUpdateProject: Thunk<IProjectStore, Project, void, IGlobalStore, Promise<AxiosResponse<Project | string>>>
  fetchProjects: Thunk<IProjectStore, void, void, IGlobalStore, Project[]>,
}

export type IGlobalStore = {
  store: IStoreInit,
  auth: IAuthStore,
  users: IUserStore,
  songs: ISongStore,
  projects: IProjectStore,
  comments: ICommentStore,
  settings: ISettingsStore,
  modals: IModalStore,
}
