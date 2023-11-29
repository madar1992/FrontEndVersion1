import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserProvider'; // Import your UserContext
import { ConstructionOutlined } from '@mui/icons-material';

function ViewJobCard({ job }) {
  const navigate = useNavigate();

  const userContext = useUserContext(); // Use the UserContext
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const handleApplyJob = async () => { // Mark the function as async
    // Fetch the user data from the user context
    const user = userContext.user;

    // Prepare the data to be sent in the request
    const requestData = {
      job,
      user,
    };

    // Make an API POST call to apply for the job
    // Include the JWT token in the request headers if required
    try {
      // Get the JWT token from local storage
      const jwtToken = localStorage.getItem('jwtToken');
      console.log('jwt token', jwtToken);
      // Make a POST request to the applyForJob endpoint on your backend
      const response = await axios.post(`${apiUrl}/applyjob/applicants/applyjob/${user.id}/${job.id}`,  {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
        },
      });
      if (response.data === 'Job Applied Successfully') {
        console.log('Applied for the job:', job.title);
        // You can handle the success response here
        // Show a success alert
      window.alert('Job applied successfully!');
      // Navigate the user
      navigate('/user');
      }
      else{
        
        // You can handle the success response here
        // Show a success alert
        window.alert('Job has been applied already!');
      }
    } catch (error) {
      console.error('An error occurred:', error);

      
    }
  };

  const handleCancel = () => {
    // Navigate back to the user page when "Cancel" is clicked
    navigate('/user');
  };

  const handleSave = async () => {
    // Make an API POST call to save the job
    // Include the JWT token in the request headers if required

    // Fetch the user data from the user context
    const user = userContext.user;

    // Prepare the data to be sent in the request
    const requestData = {
      job,
      user,
    };

   
    // Make an API POST call to apply for the job
    // Include the JWT token in the request headers if required
    try {
      // Get the JWT token from local storage
      const jwtToken = localStorage.getItem('jwtToken');
      console.log('jwt token', jwtToken);
      // Make a POST request to the applyForJob endpoint on your backend
    const response = await axios.post(`${apiUrl}/savedjob/applicants/savejob/${user.id}/${job.id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
        },
      });
      if (response.status === 200) {
        console.log('Saved job successfully:', job.title);
      
        // You can handle the success response here
        // Show a success alert
      window.alert('Saved job successfully!');
      // Navigate the user
      navigate('/user');
      }
     
     
    } catch (error) {
     
      window.alert('Job has already been saved by the applicant');
    
      console.error('An error occurred:', error);

      
    }
  };

  return (
    <Card
      sx={{
        width: '900px',
        margin: '10px', // Add margin between cards
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: '24px',
        }}
      >
        <Stack spacing={3}>
          <Typography variant="body2" color="text.secondary">
            {job.jobTitle}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              {job.companyname}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Stack direction="row" spacing={0.5} alignItems="center">
              <LocationOnOutlinedIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {job.location}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={6}>
            <Typography variant="body2" color="text.secondary">
              {job.minSalary}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.minimumExperience}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Posted on {job.datePosted}
          </Typography>
        </Stack>
        <img
          src="/assets/1.jpg"
          alt="company name"
          height="64px"
          width="64px"
        />
      </CardContent>
      <Stack
        direction="row"
        spacing={2} // Adjust the spacing between buttons
        sx={{ marginBottom: '12px', paddingRight: '24px' }}
      >
        <Button
          type="button"
          onClick={handleApplyJob}
          sx={{
            backgroundColor: 'blue',
            color: 'white',
            '&:hover': {
              backgroundColor: 'blue', // Remove hover effect
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
        <Button
          type="button"
          onClick={handleSave}
          sx={{
            backgroundColor: 'blue',
            color: 'white',
            '&:hover': {
              backgroundColor: 'blue', // Remove hover effect
            },
          }}
        >
          Save Job
        </Button>
      </Stack>
    </Card>
  );
}

export default ViewJobCard;
