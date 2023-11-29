import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserProvider';
import Sidebar from './Sidebar';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 'calc(50% - 16px)',
  marginBottom: theme.spacing(2),
}));



const CardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  '& > *': {
    flexBasis: 'calc(50% - 16px)',
    marginBottom: theme.spacing(2),
  },
}));

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',
  padding: '16px',
});

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Declare 'error' state variable
  const jwtToken = localStorage.getItem('jwtToken');
  const userContext = useUserContext(); 
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/savedjob/getSavedJobs/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        
        if (Array.isArray(response.data)) {
          setSavedJobs(response.data);
        } else {
          setError('Invalid data received from the server.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setError('Error fetching applied jobs. Please try again later.');
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, [userId, jwtToken]);


const handleCancel = () => {
    // Navigate back to the user page when "Cancel" is clicked
    navigate('/user');
  };


const handleApplyJob = async (id) => { // Mark the function as async
    // Fetch the user data from the user context
    const user = userContext.user;

    // Prepare the data to be sent in the request
    const requestData = {
     
      user,
    };

    // Make an API POST call to apply for the job
    // Include the JWT token in the request headers if required
    try {
      // Get the JWT token from local storage
      const jwtToken = localStorage.getItem('jwtToken');
      console.log('jwt token', jwtToken);
      // Make a POST request to the applyForJob endpoint on your backend
      console.log(user);
      console.log(id);
      const response = await axios.post(`${apiUrl}/applyjob/applicants/applyjob/${user.id}/${id}`,  {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
        },
      });
      if (response.data === 'Job Applied Successfully') {
        //console.log('Applied for the job:', job.title);
        // You can handle the success response here
        // Show a success alert
      window.alert('Job applied successfully!');
      // Navigate the user
      navigate('/user');
      }
      else{
        //console.log('Somthing went wrong:', job.title);
        // You can handle the success response here
        // Show a success alert
      window.alert('Job already has been applied');
      }
    } catch (error) {
      console.error('An error occurred:', error);

      
    }
  };
  return (
    <div class="employer-home">
            <Sidebar />
            <div class="container">
            {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
    <CardContainer>
      {savedJobs.map((job, index) => (
        <StyledCard key={index}>
          <CardContent>
            <Typography variant="h5" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {job.jobTitle}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: (theme) => theme.palette.secondary.main }}>
              {job.companyname}
            </Typography>
            <div sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnOutlinedIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {job.location}
              </Typography>
            </div>
            <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">
                Salary: {job.minSalary}
              </Typography>
              <Typography variant="subtitle1">
                Experience: {job.minimumExperience}
              </Typography>
            </div>
            <Typography variant="body2" sx={{ marginTop: (theme) => theme.spacing(1), color: (theme) => theme.palette.text.secondary }}>
              Posted on {job.datePosted}
            </Typography>
          </CardContent>
          
          <ButtonContainer>
         
          <Button
  type="button"
  onClick={() => handleApplyJob(job.id)}
  sx={{
    backgroundColor: 'blue',
    color: 'white',
    '&:hover': {
      backgroundColor: 'blue',
    },
  }}
>
  Apply
  
</Button>

        <Button
          type="button"
          onClick={handleCancel}
          sx={{
            backgroundColor: 'blue',
            color: 'white',
            '&:hover': {
              backgroundColor: 'blue', // Remove hover effect
            },
          }}
        >
          Cancel
        </Button>
          </ButtonContainer>
        </StyledCard>
      ))}
    </CardContainer>
        )}
    </div>
    </div>
  );
};

export default SavedJobs;
