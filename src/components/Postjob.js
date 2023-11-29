import React, { useState, useRef } from "react";

import { MdCloudUpload } from 'react-icons/md';

import Grid from '@mui/material/Grid';

import "../css/Postjobform.css";

import Residebar from "./Residebar";

import axios from 'axios';

import { useUserContext } from './UserProvider';



const Postjob = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  // Define state variables to store form data

  const [jobTitle, setJobTitle] = useState("");

  const [minimumExperience, setMinimumExperience] = useState("");

  const [maximumExperience, setMaximumExperience] = useState("");

  const [minSalary, setMinSalary] = useState("");

  const [maxSalary, setMaxSalary] = useState("");

  const [location, setLocation] = useState("");

  const [employeeType, setEmployeeType] = useState("");

  const [industryType, setIndustryType] = useState("");

  const [minimumQualification, setMinimumQualification] = useState("");

  const [specialization, setSpecialization] = useState("");

  const [skillsRequired, setSkillsRequired] = useState([

    { skillName: "", minimumExperience: "" },

  ]);

  const [jobHighlights, setJobHighlights] = useState("");

  const [description, setDescription] = useState("");

  const [uploadDocument, setUploadDocument] = useState(null);

  const [image, setImage] = useState(null);

  const [fileName, setFileName] = useState("No selected file")

  const fileInputRef = useRef(null);

 

  const user1 = useUserContext();

  const user = user1.user;


 

  // Handle form submission

  const handleSubmit = (e) => {

    e.preventDefault();

   

    // Prepare the form data to send to the server

    const formData = {

      jobTitle,

      minimumExperience,

      maximumExperience,

      minSalary,

      maxSalary,

      location,

      employeeType,

      industryType,

      minimumQualification,

      specialization,

      skillsRequired,

      jobHighlights,

      description,

      uploadDocument,

    };

 

    // Get the JWT token from local storage

    const jwtToken = localStorage.getItem('jwtToken');

 

    // Configure the headers with the JWT token

    const headers = {

      Authorization: `Bearer ${jwtToken}`,

      'Content-Type': 'application/json', // Set the content type as needed

    };

 

    // Make the API call to your backend with the JWT token in the headers

    axios

      .post(`${apiUrl}/job/recruiters/saveJob/${user.id}`, formData, { headers })

      .then((response) => {

        // Handle the successful response here, such as showing a success message or redirecting the user
        
        console.log('API Response:', response.data);

        window.alert('job saved successfully');
      })

      .catch((error) => {

        // Handle any errors that occur during the API call, such as displaying an error message

        console.error('API Error:', error);

      });

  };

 

  const handleExperienceChange = (e, index, field) => {

    const updatedSkillsRequired = [...skillsRequired];

    updatedSkillsRequired[index][field] = e.target.value;

    setSkillsRequired(updatedSkillsRequired);

  };

 

  const addExperience = () => {

    setSkillsRequired([...skillsRequired, { skillName: "", minimumExperience: "" }]);

  };

 

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      // Check if the file type is allowed (PDF or DOC)

      if (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {

        setFileName(file.name);

        setImage(URL.createObjectURL(file));

      } else {

        // Handle invalid file type

        alert("Please select a valid PDF or DOC file.");

        e.target.value = null; // Clear the file input

      }

    }

  };

 

  const handleBrowseClick = () => {

    // Trigger a click event on the hidden file input element

    if (fileInputRef.current) {

      fileInputRef.current.click();

    }

  };

 

  return (

    <div>

      <Grid container spacing={2}>

        <Grid item xs={12} sm={2} sx={{ marginLeft: '20px', marginTop: '32px' }}>

          <Residebar />

        </Grid>

        <Grid item xs={12} sm={8} sx={{ marginTop: '32px', display: 'flex', flexDirection: 'row' }}>

          <div className="job-form">

            <div>

              <h1>Enter Job Details</h1>

            </div>

            <form onSubmit={handleSubmit}>

              {/* Job Title */}

              <div className="form-group">

                <div>

                  <label className="field-title">Job Title</label>

                </div>

                <div>

                  <input

                    type="text"

                    placeholder="Job Role | Job Designation"

                    className="job-title-field"

                    value={jobTitle}

                    onChange={(e) => setJobTitle(e.target.value)}

                    required

                  />

                </div>

              </div>

 

              {/* Years of Experience */}

              <div className="form-group">

                <div>

                  <label className="field-title">Years of Experience</label>

                </div>

                <div className="experience-inputs">

                  <label className="field-title">Minimum</label>

                  <input

                    type="number"

                    placeholder="Min"

                    className="minimum-field"

                    value={minimumExperience}

                    onChange={(e) => setMinimumExperience(e.target.value)}

                    required

                  />

                  <label className="field-title">Maximum</label>

                  <input

                    type="number"

                    placeholder="Max"

                    className="minimum-field"

                    value={maximumExperience}

                    onChange={(e) => setMaximumExperience(e.target.value)}

                    required

                  />

                </div>

              </div>

 

              {/* Salary Range */}

              <div className="form-group">

                <div>

                  <label className="field-title">Salary Range</label>

                </div>

                <div className="salary-inputs">

                  <div>

                    <label className="field-title">Min Salary</label>

                  </div>

                  <div>

                    <input

                      type="number"

                      placeholder="Min"

                      className="min-salary-field"

                      value={minSalary}

                      onChange={(e) => setMinSalary(e.target.value)}

                      required

                    />

                  </div>

                  <div>

                    <label className="field-title">Max Salary</label>

                  </div>

                  <div>

                    <input

                      type="number"

                      placeholder="Max"

                      className="min-salary-field"

                      value={maxSalary}

                      onChange={(e) => setMaxSalary(e.target.value)}

                      required

                    />

                  </div>                

                </div>

              </div>

 

              {/* Location */}

              <div className="form-group">

                <div>

                  <label className="field-title">Location</label>

                </div>

                <div>

                  <input

                    type="text"

                    className="location-field"

                    value={location}

                    placeholder="City"

                    onChange={(e) => setLocation(e.target.value)}

                    required

                  />

                </div>

              </div>

 

              {/* Employee Type */}

              <div className="form-group">

                <div className="side-by-side">

                  <div className="field">

                    <div>

                      <label className="field-title">Employee Type</label>

                    </div>

                    <div>

                      <select

                        value={employeeType}

                        className="employee-field"

                        onChange={(e) => setEmployeeType(e.target.value)}

                        required

                      >

                        <option value="">Select</option>

                        <option value="Full-time">Full-time</option>

                        <option value="Part-time">Part-time</option>

                        <option value="Contract">Contract</option>

                      </select>

                    </div>

                  </div>

                  <div className="field">

                    <div>

                      <label className="field-title">Industry Type</label>

                    </div>

                    <div>

                      <input

                        type="text"

                        value={industryType}

                        className="industry-field"

                        placeholder="Sector"

                        onChange={(e) => setIndustryType(e.target.value)}

                        required

                      />

                    </div>

                  </div>

                </div>

              </div>

 

              {/* Minimum Qualification */}

              <div className="form-group">

                <div className="side-by-side">

                  <div className="field">

                    <div>

                      <label className="field-title">Minimum Qualification</label>

                    </div>

                    <div>

                      <input

                        type="text"

                        value={minimumQualification}

                        className="qualification-field"

                        placeholder="B tech"

                        onChange={(e) => setMinimumQualification(e.target.value)}

                        required

                      />

                    </div>

                  </div>

                  <div className="field">

                    <div>

                      <label className="field-title">Specialization</label>

                    </div>

                    <div>

                      <input

                        type="text"

                        value={specialization}

                        className="specialization-field"

                        placeholder="Other courses"

                        onChange={(e) => setSpecialization(e.target.value)}

                      />

                    </div>

                  </div>

                </div>

              </div>

 

              {/* Skills Required */}

              <div className="form-group">

                <div>

                  <label className="field-title">Skills Required</label>

                </div>

               
{skillsRequired.map((skill, index) => (
  <div key={index} className="experience-table">
    <div>
      <input
        type="text"
        placeholder="Skill"
        value={skill.skillName}
        onChange={(e) => handleExperienceChange(e, index, "skillName")}
      />
    </div>
    <div>
      <input
        type="text"
        placeholder="Experience"
        value={skill.minimumExperience}
        onChange={(e) => handleExperienceChange(e, index, "minimumExperience")}
      />
    </div>
    {index === skillsRequired.length - 1 && (
      <button type="button" onClick={addExperience}>
        Add Skill
      </button>
    )}
  </div>
))}
              </div>

              {/* Job Highlights */}

              <div className="form-group">

                <div>

                  <label className="field-title">Job Highlights</label>

                </div>

                <div>

                  <textarea

                    className="job-highlights-field"

                    placeholder="Job Key points"

                    value={jobHighlights}

                    onChange={(e) => setJobHighlights(e.target.value)}

                  />

                </div>

              </div>

 

              {/* Job Description */}

              <div className="form-group">

                <div>

                  <label className="field-title">Description</label>

                </div>

                <div>

                  <textarea

                    className="description-field"

                    placeholder="Roles & Responsibilities"

                    value={description}

                    onChange={(e) => setDescription(e.target.value)}

                  />

                </div>

              </div>

 

              {/* Upload Job Description Document

              <div className="form-group">

                <div>

                  <label className="field-title">Upload Job Description Document</label>

                </div>

                <div className="input-container">

                  <input

                    type="text"

                    className="file-input"

                    placeholder="Choose a file..."

                    value={fileName}

                    readOnly

                  />

                  <button

                    type="button"

                    className="browse-button"

                    onClick={handleBrowseClick}

                  >

                    <MdCloudUpload color="#1475cf" size={24} />

                    Browse

                  </button>

                </div>

                <div className="upload-field" onClick={() => fileInputRef.current.click()}>

                  <input

                    type="file"

                    className="file-field"

                    accept=".pdf,.doc,.docx"

                    onChange={handleFileChange}

                    ref={fileInputRef}

                  />

                  {image ? (

                    <img src={image} width={80} height={80} alt={fileName} />

                  ) : (

                    <MdCloudUpload color="#1475cf" size={80} />

                  )}

                  <p className="drag-drop-text">Drag and Drop file here</p>

                  <p className="upload-text">Upload PDF & word only</p>

                  <p className="upload-text">Max file size 5MB</p>

                </div>

              </div> */}

 

              {/* Post Job Button */}

              <div className="form-group">

                <button type="submit">Post Job</button>

              </div>

            </form>
           
          </div>

        </Grid>

      </Grid>

    </div>

  );

};

 

export default Postjob;