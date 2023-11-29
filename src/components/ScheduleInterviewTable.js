import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


function ScheduleInterviewTable({ applyJobId, applicantId }) {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
  
    useEffect(() => {
      if (applyJobId === null) {
        // Handle the case when applyJobId is null
        setLoading(false);
        return;
      }
  
      axios
        .get(`${apiUrl}/applyjob/getScheduleInterviews/applicant/${applyJobId}/${applicantId}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setInterviews(response.data);
          } else {
            console.error("API response is not an array:", response.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, [applyJobId, applicantId]);
  
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Interview Title</th>
                <th>Interview Person</th>
                <th>Type of Interview</th>
                <th>Round</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview) => (
                <tr key={interview.id}>
                  <td>{interview.interviewTitle}</td>
                  <td>{interview.interviewPerson}</td>
                  <td>{interview.typeOfInterview}</td>
                  <td>{interview.round}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  export default ScheduleInterviewTable;