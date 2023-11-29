import React from 'react';
import '../css/EmployerHome.css';
import '../css/Dashboard.css';
import Residebar from './Residebar';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useUserContext } from './UserProvider';

const EmployerHome = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const { id } = useParams(); // Assuming you want to get the id from the URL
    const { user } = useUserContext();
    const [contActiveJobs, setActiveCountJobs] = useState(0);
    const [contJobApplicants, setJobApplicants] = useState(0);
    const [contJobHires, setJobHires] = useState(0);
    const [countInterviews, setInterviews] = useState(0);
    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }

        // Fetch team members data
        axios
            .get(`${apiUrl}/job/recruiterscountjobs/${user.id}`)
            .then((response) => {
                setActiveCountJobs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching team members:', error);
            });
    }, [id]); // Include id as a dependency if you use it in the effect

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }

        // Fetch team members data
        axios
            .get(`${apiUrl}/applyjob/recruiters/applyjobapplicantscount/${user.id}`)
            .then((response) => {
                setJobApplicants(response.data);
            })
            .catch((error) => {
                console.error('Error fetching team members:', error);
            });
    }, [id]); // Include id as a dependency if you use it in the effect

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }

        // Fetch team members data
        axios
            .get(`${apiUrl}/applyjob/recruiters/selected/count`)
            .then((response) => {
                setJobHires(response.data);
            })
            .catch((error) => {
                console.error('Error fetching team members:', error);
            });
    }, [id]); // Include id as a dependency if you use it in the effect

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }

        // Fetch team members data
        axios
            .get(`${apiUrl}/applyjob/recruiters/countShortlistedAndInterviewed`)
            .then((response) => {
                setInterviews(response.data);
            })
            .catch((error) => {
                console.error('Error fetching team members:', error);
            });
    }, [id]); // Include id as a dependency if you use it in the effect


    return (
        <div class="employer-home">
            <Residebar />
            <div class="container">
                <h2> Organization Overview</h2>

                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-xl-3">
                            <div class="card bg-c-blue order-card">
                                <div class="card-block">
                                    <h2 class="m-b-20">Active Jobs</h2>
                                    <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span>{contActiveJobs}</span></h2>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-xl-3">
                            <div class="card bg-c-green order-card">
                                <div class="card-block">
                                    <h2 class="m-b-20">Job Applicants</h2>
                                    <h2 class="text-right"><i class="fa fa-rocket f-left"></i><span>{contJobApplicants}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-xl-3">
                            <div class="card bg-c-yellow order-card">
                                <div class="card-block">
                                    <h2 class="m-b-20">Interviews</h2>
                                    <h2 class="text-right"><i class="fa fa-refresh f-left"></i><span>{countInterviews}</span></h2>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 col-xl-3">
                            <div class="card bg-c-pink order-card">
                                <div class="card-block">
                                    <h2 class="m-b-20">Hires</h2>
                                    <h2 class="text-right"><i class="fa fa-credit-card f-left"></i><span>{contJobHires}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerHome;
