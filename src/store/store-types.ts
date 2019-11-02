import { Action, Thunk, Select, Computed } from 'easy-peasy'
import { AuthStore } from './auth-store'
import { CommentStore } from './comment-store'
import { UserStore } from './user-store'
import { User } from './user-store';
import { Project, Comment, AudioFile, Clip } from '../types/music-types';
import { AxiosResponse, AxiosPromise } from 'axios';

export interface IStoreInit {
  init: Thunk<IStoreInit, void, void, IGlobalStore>,
}

export interface ISettingsStore {

}

export type LoginPayload = {email: string, password: string}
export type SignupPayload = {email: string, password: string, confirm_password: string, username: string, first_name: string, last_name: string}
export interface IAuthStore {
  authToken: string | null
  setAuthToken: Action<IAuthStore, string>
  getAuthToken: Computed<IAuthStore, string>
  login: Thunk<IAuthStore, LoginPayload, void, IGlobalStore>
  signup: Thunk<IAuthStore, SignupPayload, void, IGlobalStore>
}

type ModalStates = {
  createProject: boolean
}
export interface IModalStore {
  openCreateProjectModal: Action<IModalStore>,
  closeCreateProjectModal: Action<IModalStore>,
  modalStates: ModalStates
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
  audioFiles: AudioFile[],
  selectedFile: File | null,
  currentPlayingSongId: number | null,
  currentPlayingSong: Computed<ISongStore>
  addAudioFileToCollection: Action<ISongStore, AudioFile>
  uploadFile: Thunk<ISongStore, File>
  setCurrentPlayingSong: Action<ISongStore, AudioFile>
  playFile: Thunk<ISongStore, AudioFile>
  pauseFile: Thunk<ISongStore, AudioFile>
  fetchAudioFiles: Thunk<ISongStore, void, void, Promise<AudioFile[]>>,
  addSongs: Action<ISongStore, AudioFile[]>
  updateFile: Action<ISongStore, AudioFile>

  createOrUpdateClip: Thunk<ISongStore, Clip>
  clips: Clip[]
  storeClips: Action<ISongStore, Clip[]>
  addClipToAudioFile: Action<ISongStore, Clip>
}

export interface ICommentStore {
  items: Comment[]
  saveComment: Thunk<ICommentStore, Comment>
  deleteComment: Thunk<ICommentStore, Comment>
  removeComment: Action<ICommentStore, Comment>
  storeComment: Action<ICommentStore, Comment>
  addComments: Action<ICommentStore, Comment[]>
  fetchComments: Thunk<ICommentStore, void, void, IGlobalStore, Promise<Comment[]>>
}

export interface IProjectStore {
  projects: Project[]
  storeProjects: Action<IProjectStore, Project[]>
  createOrUpdateProject: Thunk<IProjectStore, Project, void, IGlobalStore, Promise<AxiosResponse<Project | string>>>
  fetchProjects: Thunk<IProjectStore, void, void, IGlobalStore, Promise<Project[]>>,
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
