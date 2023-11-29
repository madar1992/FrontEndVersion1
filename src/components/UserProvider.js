import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('');

  // Load user data and userType from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  // Update user data and userType in localStorage whenever user or userType changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); // Clear user data from localStorage
    }
  }, [user]);

  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('userType'); // Clear userType from localStorage
    }
  }, [userType]);

  return (
    <UserContext.Provider value={{ user, setUser, userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
