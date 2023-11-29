import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import ViewJobCard from './ViewJobCard'; // Import the CustomJobCard component
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from 'axios'; // Import Axios

function JobDetailPage() {
  const { id } = useParams(); // Get the job ID from the URL parameter
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details using the job ID from an API
    // Include the JWT token in the Axios headers for authorization
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    }

    axios.get(`${apiUrl}/viewjob/applicant/viewjob/${id}`)
  
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
      });
  }, [id]);

  if (!job) {
    // Handle the case where the job data is still loading
    return <div>Loading job details...</div>;
  }

  

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center', pt: 1, pr: 0 }}>
          <Sidebar />
        </Grid>

        <Grid item xs={12} sm={10} sx={{ display: 'flex' }}>
          <div>
            <ViewJobCard job={job} /> {/* Use the CustomJobCard component to render job details */}
            <Stack
              direction="row"
              gap="space-between"
              sx={{ marginBottom: '12px', paddingRight: '24px' }}
            >
              
            </Stack>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default JobDetailPage;
