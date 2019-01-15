import axios from 'axios'
import {effect} from 'easy-peasy'

import { UserStoreState, UserStoreActions, User } from './user-store.types'

type IUserStore = UserStoreActions & UserStoreState

const UserStore: IUserStore = {
  currentUser: null,
  users: [],

  addUsers: (state: UserStoreState, payload: User[]) => {
    state.users = state.users.concat(payload)
  },

  fetchUsers: effect(async (dispatch: any) => {
    const {data} = await axios.get('/users')

    if (data) {
      dispatch.users.addUsers(data)
    }
  }),

  setCurrentUser: (state, payload) => {
    state.currentUser = payload
  },
}

export default UserStore
