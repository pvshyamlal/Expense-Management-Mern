import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage({ text: data.message, type: 'success' });
        localStorage.setItem('token', data.token);
        navigate('/profile');
      } else {
        setMessage({ text: data.message, type: 'error' });
      }
    } catch (error) {
      setLoading(false);
      setMessage({ text: 'Error during login. Please try again later.', type: 'error' });
    }
  };

  return (
    <div className="login-container">
      {/* Back to Home Link positioned at the top-right */}
      <div className="home-link-top">
        <Link to="/" className="link">← Back to Home</Link>
      </div>

      <div className="login-form">
        <h2 className="login-heading">Login</h2>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
