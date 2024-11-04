import React, { useState } from 'react';
import './ForgotPassword.css'
import newRequest from '../../utils/newRequest';

function ForgotPassword() {
  const [email, setEmail] = useState("");  // State for storing the user's email input
  const [success, setSuccess] = useState(null);  // State for storing success message
  const [error, setError] = useState(null);  // State for storing error message

  const handleSubmit = async (e) => {   // Handler for form submission
    e.preventDefault();

    try {  // Sending POST request to the server to request a password reset
      await newRequest.post("/auth/forgot-password", { email });   
      setSuccess("A password reset link has been sent to your email.");  // Setting success message
      setError(null);  // Clearing any previous error message
    } catch (err) {
      setError(err.response.data);  // Setting error message from response
      setSuccess(null);  // Clearing any previous success message
    }
  };

  return (
    <div className="forgot-password">
      <form className='forgot-password-form' onSubmit={handleSubmit}>
        <h1 className='forgot-password-heading'>Forgot Password</h1>
        <p>Enter your email address, and we'll send you a link to reset your password.</p>
        
        <input 
          className='forgot-password-input'
          type="email" 
          placeholder="Enter your email" 
          onChange={e => setEmail(e.target.value)} 
        />
        
        <button className='forgot-password-btn' type="submit">Send Reset Link</button>

        {success && <span className='success'>{success}</span>}
        {error && <span className='error'>{error}</span>}
      </form>
    </div>
  );
}

export default ForgotPassword;
