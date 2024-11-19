import React, { useState } from 'react';
import './Login.css';
import newRequest from '../../utils/newRequest';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await newRequest.post("/auth/login", { username, password });
      // Save the JWT token in localStorage
      localStorage.setItem("accessToken", res.data.accessToken);

      // Optionally save the user info in localStorage for future reference
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form className='login-form' onSubmit={handleSubmit}>
        <h1 className='login-heading'>Sign in</h1>
        <label className="user-login" htmlFor="">Username</label>
        <input className='login-input' name="username" type="text" placeholder="Enter your username" onChange={e => setUsername(e.target.value)} />

        <label className="user-login" htmlFor="">Password</label>
        <input className='login-input'
          name="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className='login-btn' type="submit">Login</button>
        <br />

        {/* Forgot Password link */}
        <Link className='forgot-password' to="/forgot-password">Forgot Password?</Link>

        {error && <span className='error'>{error}</span>}
      </form>
    </div>
  );
}

export default Login;



