import React, { useState } from 'react'

const Signup = () => {

  // input fields
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async(e) => {
    e.preventDefault()
  }

  return (
    <div className="signupForm" style={{display:"flex", justifyContent:"center"}}>
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
        <button className='btn btn-warning'>SIGN UP</button>
      </form>
    </div>
  )
}

export default Signup