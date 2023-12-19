// LogoutButton.js
import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Clear the authentication token from local storage
    sessionStorage.removeItem('token');
    // Redirect to the login page or any other appropriate action
    window.location.href = '/';
  };

  return (
    <button type="button" class="btn btn-danger" onClick={handleLogout}>Logout</button>

  );
};

export default LogoutButton;
