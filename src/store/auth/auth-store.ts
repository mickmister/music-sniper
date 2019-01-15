import axios from 'axios'
import {effect, select} from 'easy-peasy'

const AuthStoreOld = {
  authToken: null,
  setAuthToken: (state, authToken) => {
    axios.defaults.headers.common['Authorization'] = authToken
    state.authToken = authToken
  },
  getAuthToken: select((state) => {
    return state.authToken
  }),

  login: effect(async (dispatch: any, payload: {}) => {
    const {data} = await axios.post('/authentication/login', payload)
    axios.defaults.headers.common['Authorization'] = data.auth_token

    dispatch.auth.setAuthToken(data.auth_token)
    dispatch.users.setCurrentUser(data.user)
    dispatch.store.init()
  }),

  signup: effect(async (dispatch: any, payload: {}) => {
    const {data} = await axios.post('/authentication/signup', payload)
    axios.defaults.headers.common['Authorization'] = data.auth_token

    dispatch.auth.setAuthToken(data.auth_token)
    dispatch.users.setCurrentUser(data.user)
    dispatch.store.init()
  }),
}

class AuthStore {

}

// export default new AuthStore()
export default AuthStoreOld
