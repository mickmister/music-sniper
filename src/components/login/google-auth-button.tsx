import React from 'react'
import {useStoreActions, Actions} from 'easy-peasy'
import useReactRouter from 'use-react-router'

import GoogleLogin, {GoogleLoginResponse} from 'react-google-login'

import CONFIG_VARS from '../../config'

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
            clientId={CONFIG_VARS.GOOGLE_AUTH_CLIENT_ID}
            buttonText={'Login'}
            onSuccess={handleAuthSuccess}
            onFailure={console.log}
            cookiePolicy={'single_host_origin'}
            theme={'dark'}
        />
    )
}
