import axios from 'axios'
import {thunk, computed, action, Action, Thunk, Computed} from 'easy-peasy'
import {GoogleLoginResponse} from 'react-google-login'

import {User} from './user-store'
import {IGlobalStore} from './store-types'

const headers = axios.defaults.headers.common

export type LoginPayload = {
    email: string;
    password: string;
}
export type SignupPayload = {
    email: string;
    password: string;
    confirm_password: string;
    username: string;
    first_name: string;
    last_name: string;
}
export type AuthResponse = {
    user: User;
    auth_token: string;
}

export interface IAuthStore {
    authToken: string | null;
    setAuthToken: Action<IAuthStore, string>;
    getAuthToken: Computed<IAuthStore, string>;
    login: Thunk<IAuthStore, LoginPayload, void, IGlobalStore>;
    signup: Thunk<IAuthStore, SignupPayload, void, IGlobalStore>;
    googleLoginSuccess: Thunk<IAuthStore, GoogleLoginResponse, void, IGlobalStore>;
    afterAuth: Thunk<IAuthStore, AuthResponse, void, IGlobalStore>;
}

export const AuthStore: IAuthStore = {
    authToken: null,
    setAuthToken: action((state, authToken) => {
        axios.defaults.headers.common.Authorization = authToken
        state.authToken = authToken
    }),

    getAuthToken: computed((state) => {
        return state.authToken
    }),

    afterAuth: thunk((actions, data, {dispatch}) => {
        headers.Authorization = data.auth_token
        actions.setAuthToken(data.auth_token)
        dispatch.users.setCurrentUser(data.user)
        dispatch.store.init()
    }),

    login: thunk(async (actions, payload) => {
        const {data} = await axios.post('/authentication/login', payload)
        actions.afterAuth(data)
    }),

    signup: thunk(async (actions, payload) => {
        const {data} = await axios.post('/authentication/signup', payload)
        actions.afterAuth(data)
    }),

    googleLoginSuccess: thunk(async (actions, googleLoginResponse) => {
        const token = googleLoginResponse.getAuthResponse().id_token
        const {data} = await axios.post('/authentication/google_signup', {token})
        actions.afterAuth(data)
    }),
}

export default AuthStore
