import {Actions, State, useStoreActions} from 'easy-peasy'
import useReactRouter from 'use-react-router'

import {IGlobalStore} from '../../store/store-types'
import {useForm, FormActions} from '../../hooks/use-form'

type LoginState = LoginPayload
type LoginActions = FormActions & {
    login: (e: any) => void
}

export function useLogin(): [LoginState, LoginActions] {
    const initialState: LoginState = {
        email: '',
        password: '',
    }

    const [state, formActions] = useForm(initialState)
    const {history} = useReactRouter()

    const login = useStoreActions((dispatch: Actions < IGlobalStore >) => dispatch.auth.login)

    return [state,
        {
            ...formActions,
            login: async (e) => {
                if (e && e.preventDefault) {
                    e.preventDefault()
                }

                await login({
                    email: state.email,
                    password: state.password,
                })
                history.push('/')
            },
        },
    ]
}
