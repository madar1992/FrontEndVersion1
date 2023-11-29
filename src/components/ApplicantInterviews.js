import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Sidebar from "./Sidebar";
import { useUserContext } from './UserProvider';

const ApplicantInterviews = () => {
  const { user } = useUserContext();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { id } = useParams();
  const [interview, setInterview] = useState(null); // Change to null
  const [applyJobId, setApplyJobId] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    }

    // Fetch the applied job data
    axios
      .get(`${apiUrl}/applyjob/getAppliedJobs/${id}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const firstJob = response.data[0];
          setApplyJobId(firstJob.id);
        }
      })
      .catch((error) => {
        console.error('Error fetching applied job details:', error);
        setApplyJobId(null);
      });
  }, [id]);

  useEffect(() => {
    if (applyJobId !== null) {
      // Fetch the interview data based on the applyJobId
      axios
        .get(`${apiUrl}/applyjob/getScheduleInterviews/applicant/${applyJobId}/${id}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setInterview(response.data); // Set the interview as a list of objects
          } else if (response.data && response.data.id) {
            setInterview([response.data]); // Convert a single object to a list
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [applyJobId, id]);

  return (
    <div>
      <div className="employer-home">
        <Sidebar />
        <div className="container">
          <h1>Your Scheduled Interview</h1>
          {interview ? (
            <ScheduleInterviewTable interview={interview} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantInterviews;

function ScheduleInterviewTable({ interview }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Interview Title</th>
            <th>Interview Person</th>
            <th>Type of Interview</th>
            <th>Round</th>
            <th>Time and Date</th>
            <th>Mode of Interview</th>
            <th>Location</th>
            <th>Interview Link</th>
          </tr>
        </thead>
        <tbody>
          {interview.map((interviewItem, index) => (
            <tr key={index}>
              <td>{interviewItem.interviewTitle}</td>
              <td>{interviewItem.interviewPerson}</td>
              <td>{interviewItem.typeOfInterview}</td>
              <td>{interviewItem.round}</td>
              <td>{formatDate(interviewItem.timeAndDate)}</td>
              <td>{interviewItem.modeOfInterview}</td>
              <td>{interviewItem.location}</td>
              <td>{interviewItem.interviewLink}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(dateArray) {
  if (dateArray && dateArray.length === 5) {
    const [year, month, day, hours, minutes] = dateArray;
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  return "";
}
