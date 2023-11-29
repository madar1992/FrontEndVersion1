import React, { useContext, useState } from 'react';
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

function RecJobCard({ job }) {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const userContext = useUserContext(); // Use the UserContext
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
 
  const handleViewApplicants = async (jobId) => { // Mark the function as async
    

    
    try {
      // Get the JWT token from local storage
      const jwtToken = localStorage.getItem('jwtToken');
      console.log('jwt token', jwtToken);
      // Make a POST request to the applyForJob endpoint on your backend
      const response = await axios.get(`${apiUrl}/applyjob/appliedapplicants/${jobId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
        },
      });
      if (response.status === 200) {
        console.log("Before navigate:", response.data);

        // Pass response.data as a prop to the AppliedApplicantsforEachJob component
      navigate(`/appliedapplicantsforEachJob`, {
        state: { applicants: response.data },
      });
        console.log("After navigate");
        
      }
      else{
        console.log('Somthing went wrong:', job.title);
        // You can handle the success response here
        // Show a success alert
      window.alert('Somthing went wrong!');
      }
    } catch (error) {
      console.error('An error occurred:', error);

      
    }
  };

  const handleCancel = () => {
    // Navigate back to the user page when "Cancel" is clicked
    navigate('/employer');
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
              {user.username}
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
              {job.minSalary} - {job.minSalary}LPA
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {job.minimumExperience} - {job.maximumExperience}Yrs
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Posted on {job.datePosted}
          </Typography>
        </Stack>
        {/* <img
          src="/assets/1.jpg"
          alt="company name"
          height="64px"
          width="64px"
        /> */}
      </CardContent>
      <Stack
        direction="row"
        spacing={2} // Adjust the spacing between buttons
        sx={{ marginBottom: '12px', paddingRight: '24px' }}
      >
       
<Button
  type="button"
  onClick={() => handleViewApplicants(job.id)}
  sx={{
    backgroundColor: 'blue',
    color: 'white',
    '&:hover': {
      backgroundColor: 'blue', // Remove hover effect
    },
  }}
>
  View Applicants
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
      </Stack>
    </Card>
  );
}

export default RecJobCard;
