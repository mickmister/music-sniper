import React, {FormEvent} from 'react'
import {Actions, useStoreActions} from 'easy-peasy'
import useReactRouter from 'use-react-router'

import {IGlobalStore, LoginPayload, SignupPayload} from '../../store/store-types'
import {useForm, FormActions} from '../../hooks/use-form'

type LoginState = LoginPayload
type LoginActions = FormActions & {
    login: () => void
}

export function useLogin(): [LoginState, LoginActions] {
    const initialState: LoginState = {
        email: '',
        password: '',
    }

    const [state, formActions] = useForm(initialState)
    const {history} = useReactRouter()

    const login = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.auth.login)

    return [state, {
        ...formActions,
        login: async () => {
            await login({
                email: state.email,
                password: state.password,
            })
            history.push('/')
        },
    }]
}

export default function LoginForm() {
    const [state, {setInputFieldValue, login}] = useLogin()

    const fields = [
        {name: 'email', value: state.email, label: 'Email'},
        {name: 'password', value: state.password, label: 'Password'},
    ]

    const clickedLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login()
    }

    return (
        <form onSubmit={clickedLogin}>
            {fields.map((f) => (
                <div key={f.name}>
                    <label>{f.label}</label>
                    <input
                        name={f.name}
                        value={f.value}
                        onChange={setInputFieldValue}
                    />
                </div>
            ))}
            <div>
                <button className='btn btn-primary'>{'Submit'}</button>
            </div>
        </form>
    )
}
