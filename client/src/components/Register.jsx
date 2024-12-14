import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(''); // For error/success messages
  const [loading, setLoading] = useState(false); // Loading state for the submit button

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    setMessage(''); // Clear any previous messages

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false); // Stop loading state

      if (response.ok) {
        setMessage({ text: data.message, type: 'success' }); // Show success message
      } else {
        setMessage({ text: data.message, type: 'error' }); // Show error message
      }
    } catch (error) {
      setLoading(false);
      setMessage({ text: 'Error registering user. Please try again later.', type: 'error' });
    }
  };

  return (
    <div className="register-container">
      {/* Back to Home Link positioned at the top-right */}
      <div className="home-link-top">
        <Link to="/" className="link">← Back to Home</Link>
      </div>

      <div className="register-form">
        <h2 className="register-heading">Register</h2>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login" className="link">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
