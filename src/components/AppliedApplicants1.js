import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Residebar from './Residebar';
import { useLocation } from 'react-router-dom';

const AppliedApplicants1 = () => {

    

  
 // const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  // Use the useLocation hook to access the location object
  const location = useLocation();
  
  // Access the state object containing the data
  const { state } = location;

  // Access the data passed from the navigating component
  const { applicants } = state;

  useEffect(() => {
    console.log("Applicants:", applicants);  // Log the applicants array
  }, [applicants]);

  
  return (
    <div>
      <div className="employer-home">
        <Residebar />
        <div className="container">
          <h1 className="mb-4">Job Applicants</h1>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Job Title</th>
                  <th>Applicant Status</th>
                  {/* Add other columns as needed */}
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant, index) => (
                  <tr key={index}>
                    <td>{applicant.applicant.name}</td>
                    <td>{applicant.applicant.email}</td>
                    <td>{applicant.applicant.mobilenumber}</td>
                    <td>{applicant.job.jobTitle}</td>
                    <td>{applicant.applicantStatus}</td>
                    {/* Add other cells as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedApplicants1;
