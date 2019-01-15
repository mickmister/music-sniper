import React, {useState} from 'react'
import {useAction} from 'easy-peasy'

type State = {
  email?: string,
  password?: string,
}

type Actions = {
  setEmail: (e: any) => void,
  setPassword: (e: any) => void,
  login: (e: any) => void
}

const useLogin = (props): [State, Actions] => {
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const set = (slice: State) => setState((state: State) => ({...state, ...slice}))

  const login = useAction(dispatch => dispatch.auth.login)

  return [state,
  {
    setEmail: e => set({email: e.target.value}),
    setPassword: e => set({password: e.target.value}),
    login: async (e) => {
      if (e && e.preventDefault) {
        e.preventDefault()
      }

      await login({email: state.email, password: state.password})
      props.gotoMainPage()
    },
  }]
}

export default function LoginForm(props) {
  const [{email, password}, {setEmail, setPassword, login}] = useLogin(props)

  return (
    <form onSubmit={login}>
      <div>
        <label>Email</label>
        <input value={email} onChange={setEmail} />
      </div>
      <div>
        <label>Password</label>
        <input value={password} onChange={setPassword} type='password' />
      </div>
      <div>
        <button className='btn btn-primary'>Submit</button>
      </div>
    </form>
  )
}
