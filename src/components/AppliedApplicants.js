import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ScheduleInterviewPopup from "./ScheduleInterviewPopup";
import Residebar from './Residebar';
import { useUserContext } from './UserProvider';

const AppliedApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const { user } = useUserContext();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { id } = useParams();

  // State to hold the selected status for all applicants
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    }

    axios
      .get(`${apiUrl}/applyjob/recruiter/${id}/appliedapplicants`)
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
      });
  }, [id]);

  const handleStatusChange = () => {
    // Handle changing the status of all applicants
    // You can make a single API call here to update the status for all applicants

    // Example API call:
    axios
      .post(`${apiUrl}/applyjob/recruiters/applyjob-update-status/${id}/${selectedStatus}`, {
        applicants: applicants,
        newStatus: selectedStatus,
      })
      .then((response) => {
        // Handle success
        // Update the status in your local state if needed
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

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


  const Table = ({ data }) => {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Job Title</th>
              <th>Applicant Status</th>
              <th>Schedule Interview Date</th>
              <th>Minimum Experience</th>
              <th>Skill Name</th>
              <th>Minimum Qualification</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((applicant, index) => (
              <tr key={index}>
                <td>
                {/* Wrap the radio button and status in a label */}
                <label htmlFor={`status-${applicant.applicantId}`}>
                  <input
                    type="radio"
                    id={`status-${applicant.applicantId}`}
                    value={applicant.applicantStatus}
                    checked={selectedStatus === applicant.applicantStatus}
                    onChange={() => setSelectedStatus(applicant.applicantStatus)}
                  />
                </label>
              </td>
                <td>{applicant.name}</td>
                <td>{applicant.email}</td>
                <td>{applicant.mobilenumber}</td>
                <td>{applicant.jobTitle}</td>
                <td>{applicant.applicantStatus}</td>
                {/* <td>{applicant.scheduleInterviewDate || "N/A"}</td> */}
                <td>
  
  <ScheduleInterviewPopup
    show={showForm}
    handleClose={handleCloseForm}
    handleSave={handleSaveForm}
    applyJobId={applicant.applyjobid}
  />
  Click on blue color to update status
</td>
                <td>{applicant.minimumExperience}</td>
                <td>{applicant.skillName}</td>
                <td>{applicant.minimumQualification || "N/A"}</td>
                <td>{applicant.location}</td>
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
          <h1>Job Applicants</h1>
          {/* <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="screening">Screening</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewing">Interviewing</option>
            <option value="selected">Selected</option>
          </select>
          <button onClick={handleStatusChange}>Update Status</button> */}
          <Table data={applicants} />
          {/* Dropdown list for changing status of all applicants */}
         
        </div>
      </div>
    </div>
  );
};

export default AppliedApplicants;
