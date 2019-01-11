import {useEffect} from 'react'
import {createStore, useAction} from 'easy-peasy'

import UserStore from './user/user-store'

const store = createStore({
  users: UserStore,
})

export function StoreInit(props: {children: any}) {
  const fetchUsers = useAction((dispatch: any) => dispatch.users.fetchUsers)

  useEffect(() => {
    fetchUsers()
    // fetch other things
  }, [])

  return props.children
}

export default store
