import {useState, useEffect, useRef} from 'react'

const SignIn = () => {
  
  return (
    <div>
      <h2>Sign In</h2>
      <form action="submit" className="sign-in-form"></form>

      <p>or</p>
      <p className="signup button">Sign Up</p>
    </div>
  )
}

export default SignIn
