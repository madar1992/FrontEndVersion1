import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import Residebar from './Residebar';
import { useUserContext } from './UserProvider';
import AddTeamMemberPopup from "./AddTeamMemberPopup";

const Interviews = () => {
  const [applicants, setApplicants] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useUserContext();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { id } = useParams(); 

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    }

    // You may need to replace 'userId' with the appropriate identifier for your user
    axios
    .get(`${apiUrl}/applyjob/recruiter/${id}/interviews/shortlisted`)
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
      });
  }, []); // Replace with the actual user identifier

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSaveForm = () => {
    // Handle saving the form data here
    setShowForm(false);
  };

  const handleAddTeamMember = (formData) => {
    // Handle adding the team member data, e.g., make an API call
    console.log("Adding Team Member:", formData);
    // Close the popup
    setShowPopup(false);
  };
  
  const Table = ({ data }) => {
    return (
        <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Applicant Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Job Title</th>
            <th>Date & Time</th>
            <th>Location</th>
            <th>Mode of Interview</th>
            <th>Round</th>
            <th>Interviewer Link</th>
            <th>Interviewer Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>{applicant.mobilenumber}</td>
              <td>{applicant.jobTitle}</td>
              <td>{applicant.timeAndDate}</td>
              <td>{applicant.location}</td>
              <td>{applicant.modeOfInterview}</td>
              <td>{applicant.round}</td>
              <td><a href={applicant.interviewLink} target='new'>Link</a></td>
              <td>{applicant.interviewPerson}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };

  return (
    <div>
          <div className="employer-home">
          <Residebar />
          <div className="container">
        <table>
            <tr>
                <td>
      <h1>Applicant Interviews Schedule</h1>
      </td>
      </tr>
      </table>
      <Table data={applicants} />
    </div>
    </div>
    </div>
  );
};

export default Interviews;