import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { WifiCalling3 } from '@mui/icons-material';
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 'calc(50% - 16px)', // Set max width for each card to 50% minus some spacing
  marginBottom: theme.spacing(2),
 
  // Add your custom styles here
}));

const CardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  '& > *': {
    flexBasis: '50%', // Ensure each card takes up 50% of the space
    marginBottom: theme.spacing(2),
  },
}));

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',
  padding: '16px', // Add padding to the button container
});

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { userId } = useParams();
  const [loading, setLoading] = useState(true); // Added loading state
  const jwtToken = localStorage.getItem('jwtToken');
  const [error, setError] = useState(null);  // Declare 'error' state variable
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/applyjob/getAppliedJobs/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (Array.isArray(response.data)) {
          setAppliedJobs(response.data);
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

    fetchAppliedJobs();
  }, [userId, jwtToken]);
  const handleCancel = () => {
    // Navigate back to the user page when "Cancel" is clicked
    navigate('/user');
  };
  const handleCheckStatus = () => {
    navigate(`/applicant-interviews/${userId}`); 
  };
  
  return (
    <div className="employer-home">
      <Sidebar />
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <CardContainer>
            {appliedJobs.map((job, index) => (
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
                    onClick={handleCheckStatus}
                    sx={{
                      backgroundColor: 'blue',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'blue',
                      },
                    }}
                  >
                    Check Status
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    sx={{
                      backgroundColor: 'blue',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'blue',
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

export default AppliedJobs;
