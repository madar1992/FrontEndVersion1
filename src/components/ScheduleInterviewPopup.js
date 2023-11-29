import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import axios from "axios";
import { useUserContext } from './UserProvider';

const ScheduleInterviewPopup = ({ applyJobId }) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [show, setShow] = useState(false);
  const user1 = useUserContext();

  const user = user1.user;

  const [interviewData, setInterviewData] = useState({
    interviewTitle: "",
    interviewPerson: "",
    typeOfInterview: "",
    round: "1",
    timeAndDate: "",
    modeOfInterview: "Online",
    location: "",
    interviewLink: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInterviewData({
      ...interviewData,
      [name]: value,
    });
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
      .post(`${apiUrl}/applyjob/scheduleInterview/${applyJobId}`, interviewData, { headers })
      .then((response) => {
        // Handle the successful response here, such as showing a success message or redirecting the user
        console.log('API Response:', response.data);
        window.alert('Interview shedule has been done');
        handleClose(); // Close the modal after successful submission
      })
      .catch((error) => {
        // Handle any errors that occur during the API call, such as displaying an error message
        console.error('API Error:', error);
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-clock">
          {/* Your icon code here */}
        </i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="interviewTitle">
              <Form.Label>Interview Title</Form.Label>
              <Form.Control
                type="text"
                name="interviewTitle"
                value={interviewData.interviewTitle}
                onChange={handleFormChange}
                placeholder="Enter interview title"
              />
            </Form.Group>
            <Form.Group controlId="interviewPerson">
              <Form.Label>Interview Person</Form.Label>
              <Form.Control
                type="text"
                name="interviewPerson"
                value={interviewData.interviewPerson}
                onChange={handleFormChange}
                placeholder="Enter interview person"
              />
            </Form.Group>
            <Form.Group controlId="typeOfInterview">
              <Form.Label>Type of Interview</Form.Label>
              <Form.Control
                type="text"
                name="typeOfInterview"
                value={interviewData.typeOfInterview}
                onChange={handleFormChange}
                placeholder="Enter type of interview"
              />
            </Form.Group>
            <Form.Group controlId="round">
              <Form.Label>Round</Form.Label>
              <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="timeAndDate">
              <Form.Label>Time and Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="timeAndDate"
                value={interviewData.timeAndDate}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="modeOfInterview">
              <Form.Label>Mode of Interview</Form.Label>
              <Form.Control as="select">
                <option>Online</option>
                <option>Face-to-Face</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={interviewData.location}
                onChange={handleFormChange}
                placeholder="Enter interview location"
              />
            </Form.Group>
            <Form.Group controlId="interviewLink">
              <Form.Label>Interview Link</Form.Label>
              <Form.Control
                type="text"
                name="interviewLink"
                value={interviewData.interviewLink}
                onChange={handleFormChange}
                placeholder="Enter interview link"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Schedule
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ScheduleInterviewPopup;
