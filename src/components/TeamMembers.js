import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Residebar from './Residebar';
import { useUserContext } from './UserProvider';
import AddTeamMemberPopup from "./AddTeamMemberPopup";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { id } = useParams(); // Assuming you want to get the id from the URL
  
  const { user } = useUserContext();

  useEffect(() => {
    if (!id) {
      // Handle the case when id is not available, for example, redirect to an error page or show a message.
      return (
        <div>
          <p>ID not found.</p>
        </div>
      );
    }
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    }

    // Fetch team members data
    axios
      .get(`${apiUrl}/team/teammembers/${id}`)
      .then((response) => {
        setTeamMembers(response.data);

      })
      .catch((error) => {
        console.error('Error fetching team members:', error);
      });
  }, [id]); // Include id as a dependency if you use it in the effect

  const handleAddTeamMember = (formData) => {
    // Handle adding a team member here
  };

  const handleDeleteTeamMember = (teamMemberId) => {
    // Send a DELETE request to delete the team member
    axios
      .delete(`${apiUrl}/team/${teamMemberId}`)
      .then((response) => {
        // Update the state to reflect the deletion
        window.alert('Team member deleted successfully');

        setTeamMembers((prevTeamMembers) =>
          prevTeamMembers.filter((member) => member.id !== teamMemberId)
                  );
      })
      .catch((error) => {
        console.error('Error deleting team member:', error);
      });
  };

  return (
    <div>
      <div className="employer-home">
        <Residebar />
        <div className="container">
          <h1>Team Members</h1>
          <button onClick={() => setShowPopup(true)}>Add Team Member</button>
          <Table data={teamMembers} handleDelete={handleDeleteTeamMember} />
          <AddTeamMemberPopup
            show={showPopup}
            handleClose={() => setShowPopup(false)}
            handleAddTeamMember={handleAddTeamMember}
            userId={id}
          />
        </div>
      </div>
    </div>
  );
};

const Table = ({ data, handleDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((teamMember, index) => (
            <tr key={index}>
              <td>{teamMember.name}</td>
              <td>{teamMember.role}</td>
              <td>{teamMember.email}</td>
              <td>{teamMember.mobilenumber}</td>
              <td>{teamMember.password}</td>
              <td>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(teamMember.id); // Call the delete function
                  }}
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMembers;
