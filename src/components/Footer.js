import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../css/Footer.css'; // Import the CSS file
import logo from '../images/logo.png';

const Footer = () => {
  return (
    <footer className="footer-container">
      
      <div className="footer-content">
        {/* Add your image tag here */}
        <div className="footer-left">
        <img src={logo} alt="Talent logo" />
        </div>
        <h3>© 2023 TechWorks. All rights reserved.</h3>
        <div className="footer-right">
          
          <ul>
            <li>
              <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/yourpage" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </li>
          </ul>
          <h3>Follow us on social media:</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
