import React, { useState } from 'react';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { poolData } from '../awsconfig';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './css/signup.css';

const userPool = new CognitoUserPool(poolData);

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    retypePassword: '',
    dateOfBirth: '',
    gender: '',
    birthplace: '',
    mobile: ''
  });

  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleVerificationChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, retypePassword, dateOfBirth, gender, birthplace, mobile } = formData;
    if (password !== retypePassword) {
      alert('Passwords do not match!');
      return;
    }

    // First, sign up with Cognito
    userPool.signUp(username, password, [{ Name: 'email', Value: email }], null, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }

      setCognitoUser(result.user);
      setIsVerificationStep(true);

      // Send additional user details to the backend
      axios.post('https://vardpdmjf2.execute-api.us-east-1.amazonaws.com/prod/add-details', {
        username,
        dateOfBirth,
        gender,
        birthplace,
        mobile
      })
      .then(() => {
        console.log('Additional user details sent successfully.');
      })
      .catch((error) => {
        console.error('Error sending user details:', error);
      });
    });
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    if (!cognitoUser) {
      alert('User not found!');
      return;
    }

    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      alert('Verification successful! You can now log in.');
      setRedirectToSignIn(true); // Set redirect to sign-in page
    });
  };

  if (redirectToSignIn) {
    return <Navigate to="/signin" />; // Redirect to the sign-in page
  }

  return (
    <div className="signup-container">
      {!isVerificationStep ? (
        <form onSubmit={handleSubmit}>
          <h2>Create an Account</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          </div>
          <div className="form-group">
            <label htmlFor="retypePassword">Retype Password</label>
            <input type="password" id="retypePassword" value={formData.retypePassword} onChange={handleChange} placeholder="Retype Password" required />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="birthplace">Birthplace</label>
            <input type="text" id="birthplace" value={formData.birthplace} onChange={handleChange} placeholder="Birthplace" required />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input type="tel" id="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <form onSubmit={handleVerificationSubmit}>
          <h2>Verify Your Account</h2>
          <div className="form-group">
            <label htmlFor="verificationCode">Verification Code</label>
            <input type="text" id="verificationCode" value={verificationCode} onChange={handleVerificationChange} placeholder="Enter Verification Code" required />
          </div>
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
}

export default SignUp;
