import axios from 'axios'
import {effect, select} from 'easy-peasy'

import { UserStoreState, UserStoreActions, User } from './user-store.types'
import { StatelessComponent } from 'react';

type IUserStore = UserStoreActions & UserStoreState

const UserStore: IUserStore = {
  users: [],

  addUsers: (state: UserStoreState, payload: User[]) => {
    payload.forEach((user: User) => {
      const index = state.users.findIndex(u => u.id === user.id)
      if (index === -1) {
        state.users.push(user)
        return
      }

      state.users[index] = {
        ...state.users[index],
        ...user,
      }
    })
  },

  fetchUsers: effect(async (dispatch: any) => {
    const {data} = await axios.get('/users')

    if (data) {
      dispatch.users.addUsers(data)
    }
  }),

  currentUserId: null,
  currentUser: select((state: any) => {
    return state.users.find((user: User) => user.id === state.currentUserId)
  }),
  setCurrentUser: (state, user) => {
    state.currentUserId = user.id
  },

  uploadAvatar: effect(async (dispatch: any, selectedFile: File, getState: any) => {
    if (!selectedFile) {
      return
    }

    const user = getState().users.currentUser

    const form = new FormData()
    form.append('user[avatar]', selectedFile)

    const {data} = await axios.put(`users/${user.id}`, form, { headers: {'Content-Type': 'multipart/form-data' }})
    dispatch.users.addUsers([data])
    return data
  }),
}

export default UserStore
