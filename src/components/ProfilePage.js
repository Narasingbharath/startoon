import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get('/api/user');
      setUserData(response.data);
    };
    fetchUserData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {userData.name}</h1>
      <p>Email: {userData.email}</p>
      <p>Gender: {userData.gender}</p>
      <p>Last Login: {userData.lastLogin}</p>
    </div>
  );
};

export default ProfilePage;
