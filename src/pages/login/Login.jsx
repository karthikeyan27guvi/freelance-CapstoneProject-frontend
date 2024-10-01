import React from 'react'

function Login() {
  return(
    <div className="login">
      <form className='login-form'onSubmit={handleSubmit}>
        <h1 className='login-heading'>Sign in</h1>
        <label className="user-login" htmlFor="">Username</label>
        <input className='login-input' name="username" type="text" placeholder="John Doe" onChange={e=>setUsername(e.target.value)}/>
        
        <label className="user-login" htmlFor="">Password</label>
        <input  className='login-input'
        name="password"
        type="password"
        onChange={e=>setPassword(e.target.value)}
        />
        <button className='login-btn' type="submit">Login</button>
        {error && error}
      </form>
    </div>
  )
}

export default Login
