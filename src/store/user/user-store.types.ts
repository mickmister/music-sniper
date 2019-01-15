export interface User {
  id: number,
  username: string,
  image_url: string,
}

export interface UserStoreState {
  users: User[],
}

export type UserStoreActions = {
  fetchUsers: () => void,
  addUsers: (state: UserStoreState, payload: User[]) => void,
  login: () => void,
}
