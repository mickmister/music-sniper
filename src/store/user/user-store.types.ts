export interface User {
  id: number,
  username: string,
  image_url: string,
}

export interface UserHookState {
  users: User[],
}

export type UserHookActions = {
  fetchUsers: () => void,
  addUsers: (state: UserHookState, payload: User[]) => void,
}
