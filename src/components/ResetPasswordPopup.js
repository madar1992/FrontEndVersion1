import React, { useState } from "react";

const ResetPasswordPopup = ({ show, teamMember, handleResetPasswordConfirmation, handleClose, apiUrl }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!show) {
    return null;
  }

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      handleResetPasswordConfirmation(teamMember.id, newPassword);
      handleClose();
    } else {
      // Handle password mismatch error
      alert("Passwords do not match");
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Reset Password for {teamMember.name}</h2>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleResetPassword}>Reset Password</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ResetPasswordPopup;
