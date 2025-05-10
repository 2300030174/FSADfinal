// src/pages/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/login");
  };
  
  return (
    <div className="logout-container">
      <h1>Thank you!</h1>
      <p>Good luck with your games 🎮</p>
      <button onClick={handleLoginRedirect}>Back to Login</button>
    </div>
  );
};

export default Logout;
