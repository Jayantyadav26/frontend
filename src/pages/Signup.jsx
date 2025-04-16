import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css"; // Import your CSS file

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  // Use VITE_ prefix

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent full page reload

    try {
      const res = await axios.post(`${backendURL}/signup`, { username, password });
      if (res.status === 200) {
        navigate('/');
      }
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="form">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <input type="submit" value="Sign Up" className="sub-btn" />
      </form>
    </div>
  );
}

export default Signup;
