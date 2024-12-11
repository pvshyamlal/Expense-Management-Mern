import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Change to useNavigate for navigation
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]); // State to hold users
  const navigate = useNavigate();  // Use useNavigate for navigation

  useEffect(() => {
    // Fetch registered users on component mount
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/users'); // Fetch all users
        const data = await response.json();
        if (response.ok) {
          setUsers(data); // Set users data into state
        } else {
          setMessage({ text: 'Error fetching users', type: 'error' });
        }
      } catch (error) {
        setMessage({ text: 'Error fetching users', type: 'error' });
      }
    };
    fetchUsers();
  }, []); // Empty dependency array to run only once when component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading
    setMessage('');  // Reset previous messages

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);  // Stop loading

      if (response.ok) {
        setMessage({ text: data.message, type: 'success' });
        // Store the token in localStorage
        localStorage.setItem('token', data.token);

        // Redirect to profile page
        navigate('/profile');  // Use navigate to redirect
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

        <h3>Registered Users:</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.email}</li> // Displaying email of registered users
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Login;
