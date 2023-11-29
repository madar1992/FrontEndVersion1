// Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faFileAlt, faHeart, faBell, faClipboard } from '@fortawesome/free-solid-svg-icons';
import profile1 from '../images/profile1.jpg';
import { useUserContext } from './UserProvider';

const Sidebar = ({ setShowAppliedJobs, setShowSavedJobs, toggleSearchBox })  => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleUpdateProfileClick = () => {
    // Navigate to the profile page
    navigate('/profile');
  };

  const handleFindJobsClick = () => {
    toggleSearchBox=true; // Call the toggleSearchBox callback
    // Navigate to the Find Jobs page if needed
    navigate('/user');
  };

  const handleAppliedJobsClick = () => {
    // Navigate to the Applied Jobs page with the user's ID as a URL parameter
    navigate(`/applied-jobs/${user.id}`);
  };

  const handleSavedJobsClick = () => {
    // Navigate to the Saved Jobs page with the user's ID as a URL parameter
    navigate(`/saved-jobs/${user.id}`);
  };
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="avatar-container">
          <img src={profile1} alt="Avatar" className="avatar" />
        </div>
        <div className="user-name">{user ? user.username : 'Guest'}</div>
        <div className="user-email">{user ? user.email : 'Guest@gmail.com'}</div>
        <button className="update-profile-button" onClick={handleUpdateProfileClick}>
          Update Profile
        </button>
      </div>
      <div className="button-container">
        <ul>
          <li onClick={handleFindJobsClick}>
            <button>
              <FontAwesomeIcon icon={faSearch} /> Find Jobs
            </button>
          </li>
          <li onClick={() => navigate(`/applied-jobs/${user.id}`)}>
            <button>
              <FontAwesomeIcon icon={faFileAlt} /> Applied Jobs
            </button>
          </li>
          <li onClick={() => navigate(`/saved-jobs/${user.id}`)}>
            <button>
              <FontAwesomeIcon icon={faHeart} /> Saved Jobs
            </button>
          </li>
          <li onClick={() => navigate(`/applicant-interviews/${user.id}`)}>
            <button>
              <FontAwesomeIcon icon={faClipboard} /> Interviews
            </button>
          </li>
          <li onClick={() => navigate(`/applicant-interviews/${user.id}`)}>
            <button>
              <FontAwesomeIcon icon={faBell} /> Alerts
            </button>
          </li>
          {/* <li onClick={() => navigate('/my-resume')}>
            <button>
              <FontAwesomeIcon icon={faClipboard} /> My Resume
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
