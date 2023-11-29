import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginForm.css';
import ForgotPassword from './ForgotPassword';
import { useUserContext } from './UserProvider';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const registrationSuccess = location.state?.registrationSuccess;
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  // Get the setUser function from the UserContext
  const { setUser } = useUserContext();
  const { setUserType } = useUserContext();

  const isFormValid = () => {
    if (!email.trim() || !password.trim()) {
      return false; // Username and password should not be empty or whitespace only
    }
    return true;
  };

  // Helper function to set JWT token in localStorage
  const setJwtToken = (token) => {
    localStorage.setItem('jwtToken', token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      window.alert('Please enter both username and password.');
      return;
    }
    try {
      let loginEndpoint;
      let count;
      if (email === 'admin' && password === 'admin') {
        count = 0;
        loginEndpoint = `${apiUrl}/adminlogin`; // User login endpoint
      } else {
        count = 1;
        loginEndpoint = `${apiUrl}/applicant/applicantLogin`; // Admin login endpoint
      }

      const response = await axios.post(loginEndpoint, {
        email,
        password,
      });

      if (response.status === 200) {
        // Assuming the response.data contains user data
        const userData = response.data;
        console.log('this is response ',userData);
        console.log('this is token ',userData.data.jwt);
        localStorage.setItem('jwtToken', userData.data.jwt);
        let userType1;

if (userData.message.includes("ROLE_JOBAPPLICANT")) {
    userType1 = "user";
} else if (userData.message.includes("ROLE_JOBRECRUITER")) {
    userType1 = "employer";
} else {
    // Handle the case when neither role is found in userData.message
    userType1 = "unknown"; // You can choose a default value here
}
console.log('this userType ',userType1);
        localStorage.setItem('userType', userType1);
       

        // Access and store the JWT token from the Authorization header
        const jwtToken = response.headers.authorization;
        
        // Set JWT token in localStorage
        //setJwtToken(jwtToken);

        setErrorMessage('');
        handleLogin();

        // Set user data in the context
        setUser(userData);
        setUserType(userData.userType);
        console.log('Login successful', userData);

        if (count === 0) {
          navigate('/admin');
        } else {
          navigate('/user');
        }

        // You can now use `jwtToken` for making authenticated requests.
        //console.log('JWT Token:', jwtToken);
      } else {
        setErrorMessage('Login failed. Please check your user name and password.');
        console.error('Login failed');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your user name and password.');
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {registrationSuccess && (
          <div className="success-message">
            Registration successful! Please log in to continue.
          </div>
        )}
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password
        </Link>
        <button type="submit">Login</button>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Login;
