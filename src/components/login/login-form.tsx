import React, {useState} from 'react'
import {useAction} from 'easy-peasy'

const useLogin = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const set = slice => setState(state => ({...state, ...slice}))

  const login = useAction(dispatch => dispatch.auth.login)

  return [state,
  {
    setEmail: e => set({email: e.target.value}),
    setPassword: e => set({password: e.target.value}),
    login: async () => {
      await login({email: state.email, password: state.password})
      props.gotoMainPage()
    },
  }]
}

export default function LoginForm(props) {
  const [{email, password}, {setEmail, setPassword, login}] = useLogin(props)

  const submitButton = (
    <button onClick={login}>
      Submit
    </button>
  )

  return (
    <div>
      <div>
        <label>Email</label>
        <input value={email} onChange={setEmail} />
      </div>
      <div>
        <label>Password</label>
        <input value={password} onChange={setPassword} type='password' />
      </div>
      <div>
        {submitButton}
      </div>
    </div>
  )
}
