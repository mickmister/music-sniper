import {useEffect} from 'react'
import {createStore, useAction} from 'easy-peasy'

import UserStore from './user/user-store'
import SongStore from './song/song-store'

const store = createStore({
  users: UserStore,
  songs: SongStore,
})

export function StoreInit(props: {children: any}) {
  const fetchUsers = useAction((dispatch: any) => dispatch.users.fetchUsers)
  const fetchAudioFiles = useAction((dispatch: any) => dispatch.songs.fetchAudioFiles)

  useEffect(() => {
    fetchUsers()
    fetchAudioFiles()
  }, [])

  return props.children
}

export default store
