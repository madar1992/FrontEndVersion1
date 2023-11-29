import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
import UserHome from './components/UserHome';
import Admin from './components/Admin';
import Profile from './components/Profile';
import RecurterRegister from './components/RecurterRegister';
import EmployerLogin from './components/EmployerLogin';
import EmployerHome from './components/EmployerHome';
import ForgotPassword from './components/ForgotPassword';
import UserProvider  from './components/UserProvider';
import EmployerForgotPassword from './components/EmployerForgotPassword';
import JobDetails from './components/JobDetails'; // Your JobDetails component
import axios from 'axios';
import AppliedJobs from './components/AppliedJobs'; // Import the AppliedJobs component
import SavedJobs from './components/SavedJobs'; // Import the SavedJobs component
import Postjob from './components/Postjob';
import OrganizationForm from './components/OrganizationForm';
import Jobopening from './components/Jobopening';
import AppliedApplicants from './components/AppliedApplicants';
import TeamMembers from './components/TeamMembers';
import Interviews from './components/Interviews';
import ApplicantInterviews from './components/ApplicantInterviews';
import AppliedApplicants1 from './components/AppliedApplicants1';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  // Example job data
  const jobs = [
    {
      id: 1,
      title: 'Fullstack Developer',
      company: 'TechCorp',
      location: 'San Francisco',
      salary: '100,000 - 120,000 USD',
      experience: '3-5 Years',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'WebTech',
      location: 'New York',
      salary: '90,000 - 110,000 USD',
      experience: '2-4 Years',
    },
    // Add more jobs as needed
  ];

 // Check for a valid token in localStorage on component mount
 useEffect(() => {
  const jwtToken = localStorage.getItem('jwtToken');
  if (jwtToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    setIsLoggedIn(true);
  }
}, []); // Empty dependency array ensures this effect runs once on component mount

  const handleLogin = () => {
    setIsLoggedIn(true);
    
    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem('jwtToken');
   
    // Include the token in the Axios default headers
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      
    }
  };
  

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Remove the JWT token from localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userType');

  };
  

  return (
    <UserProvider> {/* Wrap routes that require user context */}
    <Router>
    <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/applied-jobs/:userId" element={<AppliedJobs />} />
          <Route path="/saved-jobs/:userId" element={<SavedJobs />} />
          <Route path="/employerRegister" element={<RecurterRegister />} />
          <Route path="/employerlogin" element={<EmployerLogin handleLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password-employer" element={<EmployerForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/postjob" element={<Postjob />} />
          <Route path="/organization" element={<OrganizationForm />} />
          <Route path="/jobopening/:id" element={<Jobopening />} />
          <Route path="/appliedapplicants/:id" element={<AppliedApplicants />} />
          <Route path="/appliedapplicantsforEachJob" element={<AppliedApplicants1 />} />
          

          

          <Route path="/team-members/:id" element={<TeamMembers />} />
          <Route path="/interviews/:id" element={<Interviews />} />
          <Route path="/applicant-interviews/:id" element={<ApplicantInterviews />} />
          {isLoggedIn ? (
            <>
              <Route path="/user" element={<UserHome />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/employer" element={<EmployerHome />} />
            </>
          ) : null}
        </Routes>
     
      <Footer />
    </Router>
    </UserProvider>
  );
};

export default App;
