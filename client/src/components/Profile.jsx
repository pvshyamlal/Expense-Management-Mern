import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate for navigation

function Profile() {
  const navigate = useNavigate();  // Use useNavigate for navigation

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Welcome to your profile!</p>
      {/* Display user's profile details here */}
    </div>
  );
}

export default Profile;
