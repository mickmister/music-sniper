import React, {useState} from 'react'
import {useAction} from 'easy-peasy'

type State = {
  email: string,
  password: string,
  username: string,
  first_name: string,
  last_name: string,
}

type Actions = {
  setEmail: (e: any) => void,
  setPassword: (e: any) => void,
  setUsername: (e: any) => void,
  setFirstName: (e: any) => void,
  setLastName: (e: any) => void,
  signup: () => void,
}

type Props = {
  gotoMainPage: () => void,
}

type stateCallback = (state: State) => State
type withCallback = (cb: stateCallback) => void
const initialState = {
  email: '',
  password: '',
  username: '',
  first_name: '',
  last_name: '',
} as State

const useSignup = (props: Props): [State, Actions] => {
  const [state, setState] = (useState as any)(initialState) as [State, withCallback]
  const set = (name: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const sState = setState
    sState(
      (state: State) => {
        return {
          ...state,
          [name]: value
        }
      }
    )}

  const signup = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.auth.signup)

  return [state,
  {
    setEmail: set('email'),
    setPassword: set('password'),
    setUsername: set('username'),
    setFirstName: set('first_name'),
    setLastName: set('last_name'),
    signup: async () => {
      await signup(state)
      props.gotoMainPage()
    },
  }]
}

export default function SignupForm(props: Props) {
  const [
    {
      email,
      password,
      username,
      first_name,
      last_name,
    }, {
      setEmail,
      setPassword,
      setUsername,
      setFirstName,
      setLastName,
      signup,
    }] = useSignup(props)

  const clickedSignup = (e: any) => {
    e.preventDefault()

    signup()
  }

  return (
    <form onSubmit={clickedSignup}>
      <div>
        <label>Email</label>
        <input value={email} onChange={setEmail} />
      </div>
      <div>
        <label>Password</label>
        <input value={password} onChange={setPassword} type='password' />
      </div>
      <div>
        <label>Password Confirmation</label>
        <input value={password} onChange={setPassword} type='password' />
      </div>
      <div>
        <label>Username</label>
        <input value={username} onChange={setUsername} />
      </div>
      <div>
        <label>First Name</label>
        <input value={first_name} onChange={setFirstName} />
      </div>
      <div>
        <label>Last Name</label>
        <input value={last_name} onChange={setLastName} />
      </div>
      <div>
        <button className='btn btn-primary'>Submit</button>
      </div>
    </form>
  )
}
