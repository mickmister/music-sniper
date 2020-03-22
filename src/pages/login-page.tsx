import React from 'react'

import GoogleAuthButton from '../components/login/google-auth-button'
import LoginBox from '../components/login/login-box'

enum LoginMode {
    GOOGLE = 'google',
    EMAIL = 'email',
}

export default function LoginPage() {
    const [loginMode, setLoginMode] = React.useState<LoginMode>(LoginMode.GOOGLE)

    const buttonText = loginMode === LoginMode.GOOGLE ? 'Login with Email' : 'Login with Google'
    const buttonFunc = loginMode === LoginMode.GOOGLE ? () => setLoginMode(LoginMode.EMAIL) : () => setLoginMode(LoginMode.GOOGLE)
    const button = (
        <button onClick={buttonFunc}>
            {buttonText}
        </button>
    )

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {loginMode === LoginMode.GOOGLE && <GoogleAuthButton/>}
            {loginMode === LoginMode.EMAIL && <LoginBox/>}
            <div style={{width: '200px'}}>

            </div>
            {button}
        </div>
    )
}
