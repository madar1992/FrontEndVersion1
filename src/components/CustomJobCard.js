import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from './UserProvider'; // Import your UserContext


 

function CustomJobCard({ job }) {

  const navigate = useNavigate();
  const userContext = useUserContext(); // Use the UserContext
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const handleViewJob = () => {
    // Navigate to the job description page
    
    navigate(`/job/${job.id}`); // Use the appropriate URL based on your routes
  };
 
  const handleSaveJob = async () => {
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
      const response = await axios.post(`${apiUrl}/savedjob/applicants/savejob/${user.id}/${job.id}`,  {
        
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
        },
      });
      if (response.status===200) {
        console.log('Saved job successfully:', job.title);
        // You can handle the success response here
        // Show a success alert
        
      window.alert('Saved job successfully!');
      // Navigate the user
      navigate('/user');
      }
    } catch (error) {

   
     
        window.alert('Job has already been saved by the applicant!');
     
      console.error('An error occurred:', error);

      
    }
  };
  return (

    <Card

      sx={{

        width: '100%',

        maxWidth: '500px', // Adjust the maximum width as needed

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

              {job.minSalary} $

            </Typography>

            <Typography variant="body2" color="text.secondary">

              {job.minimumExperience} years

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

        spacing={36}

        sx={{ marginBottom: '12px', paddingRight: '24px' }}

      >

        <Button type="button" onClick={handleViewJob}>View Job</Button>

       

        <Button type="button" onClick={handleSaveJob} >Save Job</Button>

      </Stack>

    </Card>

  );

}

 

export default CustomJobCard;