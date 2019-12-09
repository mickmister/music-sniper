import axios from 'axios'
import {computed, thunk, action, Action, Thunk, Computed} from 'easy-peasy'

import {User} from './user-store'
import {IGlobalStore} from './store-types'

export interface IUserStore {
    users: User[];
    fetchUsers: Thunk<IUserStore, void, void, IGlobalStore>;
    addUsers: Action<IUserStore, User[]>;
    currentUserId: number;
    currentUser: Computed<IUserStore, User>;
    setCurrentUser: Action<IUserStore, User>;
    uploadAvatar: Thunk<IUserStore, File, void, IGlobalStore>;
}

export interface User {
    id: number,
    username: string,
    image_url: string,
}

export const UserStore: IUserStore = {
    users: [],

    addUsers: action((state, payload: User[]) => {
        payload.forEach((user: User) => {
            const index = state.users.findIndex((u) => u.id === user.id)
            if (index === -1) {
                state.users.push(user)
                return
            }

            state.users[index] = {
                ...state.users[index],
                ...user,
            }
        })
    }),

    fetchUsers: thunk(async (actions: any) => {
        const {data} = await axios.get('/users')

        if (data) {
            actions.addUsers(data)
        }
    }),

    currentUserId: null,
    currentUser: computed((state: any) => {
        return state.users.find((user: User) => user.id === state.currentUserId)
    }),
    setCurrentUser: action((state, user) => {
        state.currentUserId = user.id
    }),

    uploadAvatar: thunk(async (actions, selectedFile: File, {getState, dispatch}) => {
        if (!selectedFile) {
            return null
        }

        const user = getState().currentUser

        const form = new FormData()
        form.append('user[avatar]', selectedFile)

        const {data} = await axios.put(`users/${user.id}`, form, {headers: {'Content-Type': 'multipart/form-data'}})
        dispatch.users.addUsers([data])
        return data
    }),
}

export default UserStore
