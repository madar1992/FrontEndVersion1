import React, { useState } from 'react';
import axios from 'axios';
import '../css/ForgotPassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState(''); // New password field
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password field
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true); // Track password validation
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const validatePassword = (value) => {
    // Password must be at least 6 characters long
    const isLengthValid = value.length >= 6;

    // Password must contain at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(value);

    // Password must contain at least one special character (non-alphanumeric)
    const hasSpecialChar = /[^A-Za-z0-9]/.test(value);

    // Password cannot contain spaces
    const hasNoSpaces = !/\s/.test(value);

    const isValid = isLengthValid && hasUppercase && hasSpecialChar && hasNoSpaces;

    setIsPasswordValid(isValid);

    return isValid;
  };

  const handleSendOTP = async () => {
    try {
      // Send a request to the server to send an OTP to the provided email
      const response = await axios.post(`${apiUrl}/forgotpassword/recuritersend-otp`, { email });

      if (response.data === 'OTP sent successfully') {
        setOtpSent(true);
        setResetSuccess(false);
        setResetError('');
      } else {
        setOtpSent(false);
        setOtpVerified(false);
        setResetError('User with given Email Id was not found in the system');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setOtpSent(false);
      setOtpVerified(false);
      setResetError('An error occurred. Please try again later.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // Send a request to the server to verify the OTP
      const response = await axios.post(`${apiUrl}/forgotpassword/recuriterverify-otp`, { email, otp });

      if (response.data === 'OTP verified successfully') {
        setOtpVerified(true);
        setResetError('');
      } else {
        setOtpVerified(false);
        setResetError('OTP verification failed. Please enter a valid OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpVerified(false);
      setResetError('OTP verification failed. Please enter a valid OTP.');
    }
  };

  const handleResetPassword = async () => {

    if (password !== confirmPassword) {
      setResetSuccess(false);
      setResetError('Passwords do not match. Please make sure the passwords match.');
      return;
    }
    
// Validate the password as the user types
if (!validatePassword(password)) {
  setResetSuccess(false);
  setResetError('Password does not meet the criteria.');
  return;
}

    try {
      // Send a request to the server to reset the password with the new password
      const response = await axios.post(`${apiUrl}/forgotpassword/recuriterreset-password/set-new-password/${email}`, {
        email,
        password,
        
      });

      if (response.data === 'Password reset was done successfully') {
        setResetSuccess(true);
        setResetError('');
      } else {
        setResetSuccess(false);
        setResetError('Password reset failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setResetSuccess(false);
      setResetError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        
        {resetSuccess ? (
          <div className="success-message">
            Password reset was done successfully. Please click on RecurterLogin to continue
          </div>
        ) : (
          <div>
            <h2>Employer Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {otpSent ? (
              otpVerified ? (
                <div>
                 
                  <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  

                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="helpful-line">
  Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, one number, one special character, and no spaces.
</div>

                  <button onClick={handleResetPassword}>Reset Password</button>
                  <p style={{ color: 'green' }}>OTP verified successfully!</p>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button type="button" onClick={handleVerifyOTP}>Verify OTP</button>
                </div>
              )
            ) : (
              <button type="button" onClick={handleSendOTP}>Send OTP</button>
            )}
            {resetError && <div className="error-message">{resetError}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
