import React, { useState } from 'react'
import { useLogin } from '../../hooks/authHooks/useLogin'

const Login = () => {
  const {login, error, isLoading} = useLogin()

  // input fields
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async(e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="loginForm" style={{display:"flex", justifyContent:"center"}}>
      <form onSubmit={handleLogin} style={{position:"absolute", top:"30%" , border:"1px solid black",borderRadius:"10px", width:"25%", padding:"10px"}}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="text"
            className='form-control' 
            onChange={e=>setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password"
            className='form-control' 
            onChange={e=>setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button disabled={isLoading} className='btn btn-primary'>LOGIN</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  )
}

export default Login