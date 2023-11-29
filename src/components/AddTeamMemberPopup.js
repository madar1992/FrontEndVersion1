import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useUserContext } from './UserProvider';

const AddTeamMemberPopup = ({ show, handleClose, handleAddTeamMember,userId }) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });
    const user1 = useUserContext();

    const user = user1.user;

    console.log("Id :",userId);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Get the JWT token from local storage
        const jwtToken = localStorage.getItem('jwtToken');

        // Configure the headers with the JWT token
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json', // Set the content type as needed
        };

        // Make the API call to your backend with the JWT token in the headers
        axios
            .post(`${apiUrl}/team/${userId}/team-members`, formData, { headers })
            .then((response) => {
                // Handle the successful response here, such as showing a success message or redirecting the user
                console.log('API Response:', response.data);
                window.alert('Team member added successfully');
            })
            .catch((error) => {
                // Handle any errors that occur during the API call, such as displaying an error message
                console.error('API Error:', error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Team Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter Name"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter Email"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter Password"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">HR</option>
                            
                            <option value="Recruiter">Recruiter</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Team Member
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddTeamMemberPopup;
