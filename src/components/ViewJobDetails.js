import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const ViewJobDetails = ({ jobId, applicantId }) => {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
 
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/viewjob/applicant/viewjob/${jobId}`);
        setJobDetails(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchJobDetails();
  }, [jobId, applicantId]);
 
  if (loading) {
    return <div>Loading job details...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  if (!jobDetails) {
    return <div>Job not found.</div>;
  }
 
  return (
    <div>
      <h2>Job Details</h2>
      <p>Title: {jobDetails.title}</p>
      <p>Company: {jobDetails.company}</p>
      <p>Location: {jobDetails.location}</p>
      <p>Salary: {jobDetails.salary}</p>
      {/* Add more details here */}
    </div>
  );
};
 
export default ViewJobDetails;