import React from 'react';
import '../css/HomePage.css';
// import fsdfa from './images/fsdfa.png';
import fsdfa from '../images/fsdfa.png'
const  About= () => {
  return (
    <div className="home-page">
      <div className="left-side">
      <h2>About Us</h2>
        <p>
          Talent Tracker is a leading platform designed to revolutionize talent acquisition and management.
          Our mission is to bridge the gap between job seekers and recruiters by simplifying the recruitment process.
          We understand the importance of finding the right talent for your organization, and we are committed
          to providing the tools and insights you need to make smart hiring decisions.
          Join our growing community of satisfied users and experience the future of talent tracking!
        </p>
    
      </div>
      <div className="right-side">
          <img src={fsdfa} alt="Talent Tracker" />  
        
      </div>
    </div>
  );
};

export default About;