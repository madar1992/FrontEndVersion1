import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import JobsList from './JobsList';
import Sidebar from './Sidebar';
import { useUserContext } from './UserProvider';
import { styled } from '@mui/material/styles';
import AppliedJobs from './AppliedJobs';
import SavedJobs from './SavedJobs';
import SearchBoxComponent from './SearchBoxComponent';

const ContentWrapper = styled('div')({
  padding: (theme) => theme.spacing(2),
});

function UserHome() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success');
  const [jobs, setJobs] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const jobsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUserContext();
  const userId = user.id;

  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [showAppliedJobs, setShowAppliedJobs] = useState(true);
  const [showSearchBox, setShowSearchBox] = useState(true);

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  const fetchJobs = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/recommendedjob/findrecommendedjob/${userId}`);
      const jobData = response.data;
      setJobs(jobData);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [userId]);

  const handleFindJobsClick = () => {
    setShowSavedJobs(false);
    setShowAppliedJobs(true);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

 

  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsToDisplay = jobs.slice(startIndex, endIndex);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center', pt: 1, pr: 0 }}>
      <Sidebar setShowAppliedJobs={setShowAppliedJobs} setShowSavedJobs={setShowSavedJobs} toggleSearchBox={showSearchBox} />

      </Grid>
      <Grid item xs={12} sm={10} sx={{ display: 'flex' }}>
        <ContentWrapper>
          <Typography variant="h4" className="recommended-text">
            Recommended jobs for you!
            {jobs.length === 0 && (
              <div style={{ color: 'red' }}>
                If you are not able to get any recommended job, please update your profile first
              </div>
            )}
            {success === 'profile-updated' && (
              <div style={{ backgroundColor: 'green', color: 'white', padding: '0px', height: '40px', width: '450px' }}>
                Profile updated successfully!
              </div>
            )}
          </Typography>
          {showSearchBox && <SearchBoxComponent />}
          <JobsList jobs={jobsToDisplay} />
          
          <div style={{ display: 'flex', marginTop: 'auto', alignSelf: 'flex-end' }}>
            {jobs.length > jobsPerPage && (
              <Pagination
                count={Math.ceil(jobs.length / jobsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
              />
            )}
          </div>
        </ContentWrapper>
      </Grid>
    </Grid>
  );
}

export default UserHome;
