import React, { useState, useEffect } from 'react';
import Residebar from './Residebar';
import Grid from '@mui/material/Grid';
import '../css/Organization.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faYoutube,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { useUserContext } from './UserProvider';

function OrganizationForm() {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [logo, setLogo] = useState('');
  const [socialProfiles, setSocialProfiles] = useState({
    twitter: '',
    instagram: '',
    youtube: '',
  });
  const [token, setToken] = useState('');
  const [headOffice, setHeadOffice] = useState(''); // Define headOffice state
  const [twitter, setTwitter] = useState(''); // Define twitter state
  const [instagram, setInstagram] = useState(''); // Define instagram state
  const [youtube, setYoutube] = useState(''); // Define youtube state

  const user1 = useUserContext();
  const user = user1.user;

  useEffect(() => {
    // Get the JWT token from local storage
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      // Prepare the request data
      // Extract the values from socialProfiles object and put them in an array
      const socialProfileValues = Object.values(socialProfiles);
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const requestData = {
        // ... (your request data here)
        website,
        phoneNumber,
        email,
        headOffice,

      };
  
      // Make the POST request with async/await
      const response = await fetch(`${apiUrl}/companyprofile/recruiters/company-profiles/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.status === 200) {
        // Handle success response
        const responseData = await response.text(); // Use response.text() to get plain text
        console.log('Success:', responseData);
        if (responseData === "CompanyProfile was already updated.") {
          window.alert('CompanyProfile was already updated.');
        } else {
          window.alert('Profile saved successfully');
        }
      } else {
        // Handle error response
        console.error('API request failed');
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('An error occurred:', error);
    }
  };
  

  const handleCancel = () => {
    // Handle cancel action here
  };

  const handleSocialProfileChange = (network, value) => {
    setSocialProfiles((prevProfiles) => {
      const updatedProfiles = [...prevProfiles];
      const index = updatedProfiles.findIndex((profile) => profile.network === network);

      if (index !== -1) {
        updatedProfiles[index].value = value;
      } else {
        updatedProfiles.push({ network, value });
      }

      return updatedProfiles;
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2} sx={{ marginLeft: '20px', marginTop: '32px' }}>
          <Residebar />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ marginTop: '32px', display: 'flex', flexDirection: 'row' }}>
          <div className="company-profile-container">
            <h1 className="profile-heading">Company Profile</h1>
            <p className="profile-subtitle">Update your company and profile here</p>
            <div className="profile-fields">
              {/* <div className="input-field">
                <label className='companyName'>Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  className='company-name-field'
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div> */}
              <div className="input-field">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  className='company-name-field'
                  placeholder="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label htmlFor="phoneNumber">Alternate Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  className='company-name-field'
                  placeholder="Alternate Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label htmlFor="email">Alternate Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Alternate Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label htmlFor="address">Head Office Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Head Office Address"
                  value={headOffice}
                  onChange={(e) => setHeadOffice(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label htmlFor="logo-upload">Company Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  id="logo-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="logo-upload" className="logo-upload-label">
                  Drag & Drop or Click to Upload Company Logo
                </label>
                {logo && <img src={logo} alt="Company Logo" className="logo-preview" />}
              </div>
              <div className="input-field social-input">
                <label htmlFor="twitter">Twitter</label>
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faTwitter} className="input-icon" />
                  <input
                    type="text"
                    id="twitter"
                    placeholder="Twitter"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-field social-input">
                <label htmlFor="instagram">Instagram</label>
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faInstagram} className="input-icon" />
                  <input
                    type="text"
                    id="instagram"
                    placeholder="Instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-field social-input">
                <label htmlFor="youtube">YouTube</label>
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faYoutube} className="input-icon" />
                  <input
                    type="text"
                    id="youtube"
                    placeholder="YouTube"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="buttons">
              <button className="submit-button" onClick={handleSubmit}>
                Save & Submit
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrganizationForm;
