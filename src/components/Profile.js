import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useUserContext } from './UserProvider'; 
const apiUrl = process.env.REACT_APP_API_BASE_URL;

 

const Profile = () => {
  const navigate = useNavigate();
  const user1 = useUserContext();
  const user=user1.user;
  let error = "";
  

  const [basicDetails, setBasicDetails] = useState({

    firstName: "",

    lastName: "",

    dateOfBirth: "",

    address: "",

    city: "",

    state: "",

    pincode: "",

    alternatePhoneNumber: "",

  });

 

  const [xClassDetails, setXClassDetails] = useState({

    xschoolName: "",

    xboard: "",

    xpercentage: "",

    xyearOfPassing: "",

    xCity: "",

    xState: "",

    xPincode: "",

  });

 

  const [intermediateDetails, setIntermediateDetails] = useState({

    icollegeName: "",

    iboard: "",

    iprogram: "",

    ipercentage: "",

    iyearOfPassing: "",

    iCity: "",

    iState: "",

  });

 

  const [graduationDetails, setGraduationDetails] = useState({

    gcollegeName: "",

    gboard: "",

    gprogram: "",

    gpercentage: "",

    gyearOfPassing: "",

    gCity: "",

    gState: "",

  });

  const [skillsRequired, setSkillsRequired] = useState([

    { skillName: "", experience: "" },

  ]);
  const [experienceDetails, setExperienceDetails] = useState([
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
    },
  ]);
  
  

  const [resumeFile, setResumeFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState("");

  const handleSkillChange = (e, index, field) => {

    const updatedSkillsRequired = [...skillsRequired];

    updatedSkillsRequired[index][field] = e.target.value;

    setSkillsRequired(updatedSkillsRequired);

  };

 

  const addSkills = () => {

    setSkillsRequired([...skillsRequired, { skillName: "", experience: "" }]);

  };



  const handleExperienceChange = (e, index, field) => {
    const newExperienceDetails = [...experienceDetails];
    newExperienceDetails[index][field] = e.target.value;
    setExperienceDetails(newExperienceDetails);
  };
  const addExperience = () => {
    setExperienceDetails([
      ...experienceDetails,
      { company: "", position: "", startDate: "", endDate: "" }
    ]);
  };
  
  
 
  

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setResumeFile(file);
  };
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare data to be sent
    const userData = {
      basicDetails,
      xClassDetails,
      intermediateDetails,
      graduationDetails,
      skillsRequired,
      experienceDetails,
      user,
    };
  
    try {
      // Get the JWT token from local storage
      const jwtToken = localStorage.getItem('jwtToken');
       console.log('jwt token new',jwtToken);
      // Make a POST request to the sign-out endpoint on your backend
      const response = await axios.post(`${apiUrl}/applicantprofile/createprofile/${user.id}`, userData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
        },
      });

      
      if (response.status === 200) {
        // Successful response
        if (response.data === 'profile saved sucessfully') {
            console.log(response.body);
            console.log('Profile updated successfully!');
           
            navigate('/user?success=profile-updated');
        } else if (response.data === 'Profile for this applicant already exists') {
            // Handle duplicate entry error (HTTP 409 Conflict)
            window.alert('Profile already updated.');
            console.log('Profile already updated.');
            navigate('/user');
            
        } else {
            console.error('An unexpected success response:', response.body);
            
        }
    } else {
        // Handle other error cases
        console.error('An error occurred:', response.status, response.body);
        
    }
    
      
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  
  

  return (
    <div className="profile-container">
      <div className="sidebar">
       <Sidebar />
      </div>

     
    <form className="profile-form-container" onSubmit={handleSubmit}>
       <h1>Update your profile</h1>
       
      {/* File Upload section
      <div className="file-upload-container">
        <p className="Details-name">Upload your resume:</p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFile(e.target.files[0])}
        />
        <div
        className={`file-drop-area ${dragging ? "dragging" : ""}`}
        onDrop={handleFileDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
      >
        <p className="Details-name">Drag and drop your resume here</p>
      </div>

      </div> */}


      <p className="Details-name">Basic Details:</p>

      <table>

        <tbody>

          {/* <tr>

            <td>

              <input

                type="text"

                placeholder="FirstName"

                className="firstName"

                value={basicDetails.firstName}

                onChange={(e) =>

                  setBasicDetails({

                    ...basicDetails,

                    firstName: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="LastName"

                className="lastName"

                value={basicDetails.lastName}

                onChange={(e) =>

                  setBasicDetails({ ...basicDetails, lastName: e.target.value })

                }

              />

            </td>

          </tr>*/}

          <tr> 

            <td>

            <label htmlFor="dateOfBirth">Date of Birth</label>
<input
  type="date"
  id="dateOfBirth"
  value={basicDetails.dateOfBirth}
  onChange={(e) =>
    setBasicDetails({
      ...basicDetails,
      dateOfBirth: e.target.value,
    })
  }
/>

            </td>

            <td>

              <input

                type="text"

                placeholder="Address"

                value={basicDetails.address}

                onChange={(e) =>

                  setBasicDetails({ ...basicDetails, address: e.target.value })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="City"

                value={basicDetails.city}

                onChange={(e) =>

                  setBasicDetails({ ...basicDetails, city: e.target.value })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="State"

                value={basicDetails.state}

                onChange={(e) =>

                  setBasicDetails({ ...basicDetails, state: e.target.value })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Pincode"

                value={basicDetails.pincode}

                onChange={(e) =>

                  setBasicDetails({ ...basicDetails, pincode: e.target.value })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Alternate phone number"

                value={basicDetails.alternatePhoneNumber}

                onChange={(e) =>

                  setBasicDetails({

                    ...basicDetails,

                    alternatePhoneNumber: e.target.value,

                  })

                }

              />

            </td>

          </tr>

        </tbody>

      </table>

 

      <p className="Details-name">X-Class Details:</p>

      <table>

        <tbody>

          <tr>

            <td>

              <input

                type="text"

                placeholder="School Name"

                value={xClassDetails.xschoolName}

                onChange={(e) =>

                  setXClassDetails({

                    ...xClassDetails,

                    xschoolName: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Board"

                value={xClassDetails.xboard}

                onChange={(e) =>

                  setXClassDetails({ ...xClassDetails, xboard: e.target.value })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Percentage"

                value={xClassDetails.xpercentage}

                onChange={(e) =>

                  setXClassDetails({

                    ...xClassDetails,

                    xpercentage: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Year of passing"

                value={xClassDetails.xyearOfPassing}

                onChange={(e) =>

                  setXClassDetails({

                    ...xClassDetails,

                    xyearOfPassing: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="City"

                value={xClassDetails.xCity}

                onChange={(e) =>

                  setXClassDetails({ ...xClassDetails, xCity: e.target.value })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="State"

                value={xClassDetails.xState}

                onChange={(e) =>

                  setXClassDetails({ ...xClassDetails, xState: e.target.value })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Pincode"

                value={xClassDetails.xPincode}

                onChange={(e) =>

                  setXClassDetails({

                    ...xClassDetails,

                    xPincode: e.target.value,

                  })

                }

              />

            </td>

          </tr>

        </tbody>

      </table>

 

      <p className="Details-name">Intermediate Details/Diploma Details:</p>

      <table>

        <tbody>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Name of college"

                value={intermediateDetails.icollegeName}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    icollegeName: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Board"

                value={intermediateDetails.iboard}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    iboard: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Program"

                value={intermediateDetails.iprogram}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    iprogram: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Percentage"

                value={intermediateDetails.ipercentage}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    ipercentage: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Year of passing"

                value={intermediateDetails.iyearOfPassing}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    iyearOfPassing: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="city"

                value={intermediateDetails.iCity}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    iCity: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="State"

                value={intermediateDetails.iState}

                onChange={(e) =>

                  setIntermediateDetails({

                    ...intermediateDetails,

                    iState: e.target.value,

                  })

                }

              />

            </td>

          </tr>

        </tbody>

      </table>

 

      <p className="Details-name">Graduation Details:</p>

      <table>

        <tbody>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Name of college"

                value={graduationDetails.gcollegeName}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gcollegeName: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Board"

                value={graduationDetails.gboard}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gboard: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Program"

                value={graduationDetails.gprogram}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gprogram: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="Percentage"

                value={graduationDetails.gpercentage}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gpercentage: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="Year of Passing"

                value={graduationDetails.gyearOfPassing}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gyearOfPassing: e.target.value,

                  })

                }

              />

            </td>

            <td>

              <input

                type="text"

                placeholder="City"

                value={graduationDetails.gCity}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gCity: e.target.value,

                  })

                }

              />

            </td>

          </tr>

          <tr>

            <td>

              <input

                type="text"

                placeholder="State"

                value={graduationDetails.GState}

                onChange={(e) =>

                  setGraduationDetails({

                    ...graduationDetails,

                    gState: e.target.value,

                  })

                }

              />

            </td>

          </tr>

        </tbody>

      </table>

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
  onChange={(e) => handleSkillChange(e, index, "skillName")}
/>
</div>
<div>
<input
  type="text"
  placeholder="Experience"
  value={skill.experience}
  onChange={(e) => handleSkillChange(e, index, "experience")}
/>
</div>
{index === skillsRequired.length - 1 && (
<button type="button" onClick={addSkills}>
  Add Skill
</button>
)}
</div>
))}
</div>

     
 {/* ...Previous Code... */}

<p className="Details-name">Experience Details:</p>

{experienceDetails.map((experience, index) => (
  <table key={index} className="experience-table">
    <tbody>
      <tr>
        <td>
          <input
            type="text"
            placeholder="Company"
            value={experience.company}
            onChange={(e) => handleExperienceChange(e, index, "company")}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Position"
            value={experience.position}
            onChange={(e) => handleExperienceChange(e, index, "position")}
          />
        </td>
        <td>
  <label htmlFor={`startDate-${index}`}>Start Date</label>
  <input
    type="date"
    id={`startDate-${index}`}
    value={experience.startDate}
    onChange={(e) => handleExperienceChange(e, index, "startDate")}
  />
</td>
<td>
  <label htmlFor={`endDate-${index}`}>End Date</label>
  <input
    type="date"
    id={`endDate-${index}`}
    value={experience.endDate}
    onChange={(e) => handleExperienceChange(e, index, "endDate")}
  />
</td>
        <td>
        <button type="button" onClick={addExperience}>Add Experience</button>
        </td>
      </tr>
    </tbody>
   
  </table>
  
))}






      <button type="submit">Submit</button>

  

    </form>
    
    </div>

  );

};

 

export default Profile;