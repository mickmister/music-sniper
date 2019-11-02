import React from 'react'
import {useStoreActions, Actions} from 'easy-peasy'
import useReactRouter from 'use-react-router'

import {SignupPayload, IGlobalStore} from '../../store/store-types'
import {FormActions, useForm} from '../../hooks/use-form'

type SignupState = SignupPayload
type SignupActions = FormActions & {
    signup: () => Promise<void>
}

export function useSignup(): [SignupState, SignupActions] {
    const initialState: SignupState = {
        email: '',
        password: '',
        confirm_password: '',
        username: '',
        first_name: '',
        last_name: '',
    }

    const [state, formActions] = useForm(initialState)
    const signup = useStoreActions((dispatch: Actions <IGlobalStore>) => dispatch.auth.signup)
    const {history} = useReactRouter()

    return [state, {
        ...formActions,
        signup: async () => {
            await signup(state)
            history.push('/')
        },
    }]
}

export default function SignupForm() {
  const [state, {setInputFieldValue, signup}] = useSignup()

  const clickedSignup = (e: any) => {
    e.preventDefault()
    signup()
  }

  const fields = [
    {name: 'email', value: state.email, label: 'Email'},
    {name: 'password', value: state.password, label: 'Password', type: 'password'},
    {name: 'confirm_password', value: state.confirm_password, label: 'Password Confirmation', type: 'password'},
    {name: 'username', value: state.username, label: 'Username'},
    {name: 'first_name', value: state.first_name, label: 'First Name'},
    {name: 'last_name', value: state.last_name, label: 'Last Name'},
  ]

  return (
    <form onSubmit={clickedSignup}>
      {fields.map(f => (
        <div>
          <label>{f.label}</label>
          <input name={f.name} value={f.value} onChange={setInputFieldValue} type={f.type} />
        </div>
      ))}
      <div>
        <button className='btn btn-primary'>Submit</button>
      </div>
    </form>
  )
}
