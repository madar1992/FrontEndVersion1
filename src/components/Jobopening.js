import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecJobCard from './RecJobCard';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Residebar from './Residebar';
import { useUserContext } from './UserProvider';

function Jobopening() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('jobTitle'); // Default filter
  const { user } = useUserContext();
  const { id } = useParams(); 

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    }

    // You may need to replace 'userId' with the appropriate identifier for your user
    axios
    .get(`${apiUrl}/job/recruiters/viewJobs/${id}`)
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
      });
  }, []); // Replace with the actual user identifier

  const applyFilters = () => {
    const filters = {};
    filters[selectedFilter] = search;
  
    axios
      .get(apiUrl + "/job/search", {
        params: filters,
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
      });
  };
  

 

  return (
    <div>
      <Grid container spacing={0}>
        <div className="employer-home">
          <Residebar />
          <div className="container">
            <table>
              <tr>
                <td>
                  <h2>Job Openings</h2>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder={`Search by ${selectedFilter}`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="jobTitle">Job Title</option>
                    <option value="location">Location</option>
                    {/* <option value="IndustryType">IndustryType</option>
                    <option value="EmployeeType">EmployeeType</option>
                    <option value="minqualification">Minimum Qualification</option>
                    <option value="specialization">Sepcialization</option> */}
                    <option value="skillName">Skill Name</option>
                  </select>
                  <button onClick={applyFilters}>Apply Filter</button>
                </td>
              </tr>
            </table>
            {jobs.map((job) => (
              <RecJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default Jobopening;
