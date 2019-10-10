import axios from 'axios'
import {thunk, computed, action} from 'easy-peasy'

import {IAuthStore} from './store-types'

export const AuthStore: IAuthStore = {
  authToken: null,
  setAuthToken: action((state, authToken) => {
    axios.defaults.headers.common['Authorization'] = authToken
    state.authToken = authToken
  }),

  getAuthToken: computed((state) => {
    return state.authToken
  }),

  login: thunk(async (dispatch: any, payload: {}) => {
    const {data} = await axios.post('/authentication/login', payload)
    axios.defaults.headers.common['Authorization'] = data.auth_token

    dispatch.auth.setAuthToken(data.auth_token)
    dispatch.users.setCurrentUser(data.user)
    dispatch.store.init()
  }),

  signup: thunk(async (dispatch: any, payload: {}) => {
    const {data} = await axios.post('/authentication/signup', payload)
    axios.defaults.headers.common['Authorization'] = data.auth_token

    dispatch.auth.setAuthToken(data.auth_token)
    dispatch.users.setCurrentUser(data.user)
    dispatch.store.init()
  }),
}

// export default new AuthStore()
export default AuthStore
