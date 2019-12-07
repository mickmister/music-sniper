import React from 'react'

import GoogleAuthButton from '../components/login/google-auth-button'
import LoginBox from '../components/login/login-box'

export default function LoginPage() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <GoogleAuthButton/>
            {/* <LoginBox/> */}
        </div>
    )
}
