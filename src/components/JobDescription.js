// JobDescription.js
import React from 'react';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';
import '../css/JobDescription.css'; // Import the CSS file

const JobDescription = ({ jobs }) => {
  const { id } = useParams(); // Get the ID from the URL parameter
  // Find the job object based on the ID
  const job = jobs.find(job => job.id === parseInt(id));

  if (!job) {
    return <div>Job not found</div>; // Handle case when job is not found
  }

  return (
    <div className="job-description-container">
      <Sidebar />
      <div className="job-details">
        <h1>{job.title}</h1>
        <div className="job-buttons">
          <button className="apply-button">Apply Now</button>
          <button className="save-button">Save</button>
        </div>
        <hr />
        <p>Company: {job.company}</p>
        <p>Location: {job.location}</p>
        <p>Job Type: {job.jobType}</p>
        <p>Salary: {job.salary}</p>
        <p>Experience: {job.experience}</p>
        <h2>Job Description</h2>
        <p>{job.description}</p>
      </div>
    </div>
  );
};

export default JobDescription;
