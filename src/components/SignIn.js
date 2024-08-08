// src/components/SignIn.js
import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import { poolData } from '../awsconfig';
import './css/signin.css';

function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    const userPool = new CognitoUserPool(poolData);
    const user = new CognitoUser({ Username: username, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: username, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        alert('Sign in successful!');
        // Redirect to a protected page or the homepage after successful sign-in
        window.location.href = '/';
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      }
    });
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
