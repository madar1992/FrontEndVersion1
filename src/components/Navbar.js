import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import '../css/Navbar.css';
import logo from '../images/logo.png';
import { useUserContext } from './UserProvider';


const Navbar = ({ isLoggedIn,handleLogout }) => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { userType, setUserType } = useUserContext();
  

  // Retrieve userType from localStorage when the component loads
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    console.log('checking',storedUserType);
  if (storedUserType) {
    setUserType(storedUserType); // Set userType from localStorage
  }
  }, []);
// Function to navigate to the user home
const goToUserHome = () => {
  navigate('/user');
};

// Function to navigate to the employer home
const goToEmployerHome = () => {
  navigate('/employer');
};
  
  const logout = async () => {



    try {
      // Get the JWT token from local storage
      const jwtToken = localStorage.getItem('jwtToken');
       console.log('jwt token',jwtToken);
      // Make a POST request to the sign-out endpoint on your backend
      const response = await axios.post(`${apiUrl}/applicant/applicantsignOut`, {
        // Include any necessary data in the request body
      }, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
        },
      });

      if (response.status === 204) {
        // Successful logout on the server
        handleLogout(); // Perform client-side logout actions (e.g., clear tokens)

        // Clear JWT token from local storage
        localStorage.removeItem('jwtToken');
        
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h3 className="navbar-title">
          <img src={logo} alt="Talent Tracker" />
        </h3>
      </div>
      <ul className="navbar-list">
        
        {isLoggedIn ? (
           <>
           
           <li className="navbar-item">
             <button className="navbar-link" onClick={logout}>
               Logout
             </button>
           </li>
         </>
        ) : (<>
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
             Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">
             About
          </Link>
        </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
            JobSeekerLogin
            </Link>
          </li>
           
          <li className="navbar-item">
            <Link to="/employerlogin" className="navbar-link">
             RecruiterLogin
            </Link>
          </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
