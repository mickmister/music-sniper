import axios from 'axios'
import {useEffect} from 'react'
import useReactRouter from 'use-react-router';
import {createStore, useAction, useStore, effect, EasyPeasyConfig, thunk, State} from 'easy-peasy'

import AuthStore from './auth/auth-store'
import UserStore from './user-store'
import SongStore from './song/song-store'
import CommentStore from './comment/comment-store'
import {IGlobalStore} from './store-types'

const loadState = () => {
  const state = localStorage.getItem('redux-state')
  if (!state) {
    return undefined
  }
  return JSON.parse(state)
}

const saveState = (state: State<IGlobalStore>) => {
  if (!state) {
    return
  }
  const toPersist = {
    auth: state.auth,
    users: state.users,
  }
  localStorage.setItem('redux-state', JSON.stringify(toPersist))
}

const persisted = loadState()

const store = createStore<IGlobalStore, EasyPeasyConfig>({
  auth: AuthStore,
  users: UserStore,
  songs: SongStore,
  comments: CommentStore,
  settings: {},
  store: {
    init: thunk((actions, _, {dispatch}) => {
      dispatch.users.fetchUsers()
      dispatch.songs.fetchAudioFiles()
      dispatch.comments.fetchComments()
    }),
  },
}, {
  initialState: persisted,
})

store.subscribe(() => {
  saveState(store.getState())
})

export function StoreInit(props: {children: any}) {
  const {history, location} = useReactRouter()
  const init = useAction(dispatch => dispatch.store.init)
  const token = useStore(state => state.auth.authToken)
  // const token = useStore(state => state.auth.authToken)

  // may want to make this more secure. another library could be using axios
  axios.defaults.headers.common['Authorization'] = token

  useEffect(() => {
    if (location.pathname !== '/login') {
      init()
    }

    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status === 401) {
        history.push('/login')
      }
      return error;
    })
  }, [])

  return props.children
}

export default store
