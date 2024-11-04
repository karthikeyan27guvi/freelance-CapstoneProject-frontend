import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './ResetPassword.css';

const ResetPassword = () => {  // State variables to manage password input, error, and success messages
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token } = useParams();  // Extracting token from URL parameters for password reset
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checking if passwords match  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");  // Setting error message if passwords do not match
      return;  // Exiting the function if there's an error
    } 

    try {  // Sending a POST request to reset the password
      await newRequest.post(`/auth/reset-password/${token}`, { password });
      setSuccess("Password has been reset successfully!");  // Setting success message on successful reset
      setTimeout(() => navigate("/login"), 1000); // Redirect to login page after success
    } catch (err) {
      setError(err.response?.data || "An error occurred.");
    }
  };

  return (
    <div className="reset-password">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h1 className="reset-heading">Reset Password</h1>

        <label htmlFor="password">New Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter new password"
        />

        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm new password"
        />

        <button type="submit" className="reset-btn">Reset Password</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
