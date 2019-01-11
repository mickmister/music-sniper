import {effect} from 'easy-peasy'

import { UserHookState, UserHookActions, User } from './user-store.types'

type IUserStore = UserHookActions & UserHookState

const UserStore: IUserStore = {
  users: [],
  addUsers: (state: UserHookState, payload: User[]) => {
    state.users = state.users.concat(payload)
  },
  fetchUsers: effect(async (dispatch: any) => {
    dispatch.users.addUsers([
      {
        id: 1,
        username: 'Michael',
        image_url: 'https://cdn-images-1.medium.com/max/1200/1*i2skbfmDsHayHhqPfwt6pA.png',
      },
      {
        id: 2,
        username: 'Jimmy',
        image_url: 'https://cdn-images-1.medium.com/max/1200/1*i2skbfmDsHayHhqPfwt6pA.png',
      }
    ])
  }),
}

export default UserStore
