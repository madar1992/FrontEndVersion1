import React from 'react';
import '../css/UserTable.css';

const UserTable = ({ users }) => {
  return (
    <div className="user-table">
      <h2>User Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* Render additional user data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
