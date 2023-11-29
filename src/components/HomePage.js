import React from 'react';
import '../css/HomePage.css';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Asset from '../images/Asset.png';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="left-side">
        <h2>Where Opportunities and Aspirations Align</h2>
        <p>
          Empowering your journey towards success and fulfillment. Whether you are a recruiter looking for top talents or an individual seeking new opportunities,
          Join us today and unlock the full potential of talent management!
        </p>

        {/* Wrap the buttons in a container */}
        <div className="cta-buttons-container">
          <Link to="/register" className="cta-button">JobSeekerRegister</Link>
          <Link to="/employerRegister" className="cta-button">RecruiterRegister</Link>
        </div>
      </div>
      <div className="right-side">
        <img src={Asset} alt="Talent Tracker" />
      </div>
    </div>
  );
};

export default HomePage;
