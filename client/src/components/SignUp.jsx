import {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
  })

  const mounted = useRef(false)

  useEffect(() => {
    if(mounted.current === false) {

    }
  })

  const onSubmit = async (e, formData) => {
    e.preventDefault()
    if(formData.email.length > 6 && formData.password.length > 0) {
      const res = await fetch("http://localhost:9000/sign_up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data.user.user_name)
      navigate(`/user/:${data.user.user_name}`)
    } else {
      alert('Check all fields.')
    }
  }

  const onChange = (e) => {
    // e.preventDefault()
    setFormData((prevState) => ({
      ...prevState,
      [e.name] : e.value
    }))
  }


  return (
    <div>
      <h2>Sign Up for Fitness Account!</h2>
      <form action="submit" onSubmit={(e) => onSubmit(e,formData)} className="sign-in-form">
        <label htmlFor="user_name">Full Name</label>
        <input 
          type="text" 
          name='user_name'  
          onChange={(e) => onChange(e.target)}  
          value={formData.user_name}
        />
        <br />
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          name='email'
          onChange={(e) => onChange(e.target)}
          value={formData.email}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          name='password'
          onChange={(e) => onChange(e.target)}
          value={formData.password}
        />
        <br />
        <button type='submit'>SUBMIT</button>
      </form>
      <p>or</p>
      <p className="signup button" onClick={() => navigate('/')}>Sign In</p>
    </div>
  )
}

export default SignUp
