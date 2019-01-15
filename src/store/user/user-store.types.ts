export interface User {
  id: number,
  username: string,
  image_url: string,
}

export interface UserStoreState {
  users: User[],
  currentUserId: number | null,
  currentUser: () => User,
}

export type UserStoreActions = {
  fetchUsers: () => void,
  addUsers: (state: UserStoreState, payload: User[]) => void,
  login: () => void,
  setCurrentUser: (dispatch: any, user: User) => void,
  uploadAvatar: (dispatch: any, avatar: File) => void,
}
