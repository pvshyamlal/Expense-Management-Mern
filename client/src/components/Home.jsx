import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Expense Management System</h1>
        <div className="home-buttons">
          <button className="home-button" onClick={goToRegister}>
            Register
          </button>
          <button className="home-button" onClick={goToLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
