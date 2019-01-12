import axios from 'axios'
import {effect} from 'easy-peasy'

import { UserHookState, UserHookActions, User } from './user-store.types'

type IUserStore = UserHookActions & UserHookState

const UserStore: IUserStore = {
  users: [],
  addUsers: (state: UserHookState, payload: User[]) => {
    state.users = state.users.concat(payload)
  },
  fetchUsers: effect(async (dispatch: any) => {
    const {data} = await axios.get('/api/users')
    dispatch.users.addUsers(data)
  }),
}

export default UserStore
