import React from 'react'
import {useStoreActions, Actions} from 'easy-peasy'
import useReactRouter from 'use-react-router'

import GoogleLogin, {GoogleLoginResponse} from 'react-google-login'

import {IGlobalStore} from '../../store/store-types'

export default function GoogleAuthButton() {
    const {history} = useReactRouter()

    const googleLoginSuccess = useStoreActions((actions: Actions<IGlobalStore>) => actions.auth.googleLoginSuccess)

    const handleAuthSuccess = async (response: GoogleLoginResponse) => {
        await googleLoginSuccess(response)
        history.push('/')
    }

    return (
        <GoogleLogin
            clientId={'918861016270-1nsq4f1vov35ql1rkbrm63rkg89hn51e.apps.googleusercontent.com'}
            buttonText={'Login'}
            onSuccess={handleAuthSuccess}
            onFailure={console.log}
            cookiePolicy={'single_host_origin'}
            theme={'dark'}
        />
    )
}
