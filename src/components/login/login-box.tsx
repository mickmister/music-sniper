import React, {useState} from 'react'

import LoginForm from './login-form'
import SignupForm from './signup-form'

export default function LoginBox() {
  const [{showSignup}, setState] = useState({showSignup: false})

  let switchModeButton
  let form
  if (showSignup) {
    form = <SignupForm />
    switchModeButton = <span>Already have an account? <a onClick={() => setState({showSignup: false})}>Login</a></span>
  }
  else {
    form = <LoginForm />
    switchModeButton = <span>Need to create an account? <a onClick={() => setState({showSignup: true})}>Sign up</a></span>
  }

  return (
    <div>
      {form}
      <div>
        {switchModeButton}
      </div>
    </div>
  )
}
