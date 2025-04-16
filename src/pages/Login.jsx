import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css"; // Import your CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const goToSignup = () =>{
    navigate('/signup'); // Correct usage of navigate
  }


  async function handleLogin(e) {
    e.preventDefault();

    try{
      console.log(backendURL);
      const response = await axios.post(`${backendURL}/signin`, { username, password },{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.status === 200){
        sessionStorage.setItem('token', response.data.token); // Store the token in session storage
        navigate('/dashboard');
      }
    } catch (err) {
      alert('Login failed');
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="form">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username" // Add autocomplete attribute
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        
        <label htmlFor="password" aria-placeholder="at least 8 characters...">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password" // Add autocomplete attribute
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <input type="submit" value="Login" className="sub-btn" />
      </form>

      <h2>Don't have an account?</h2>
      <button className='signup-btn' onClick={goToSignup}>Sign Up</button>
    </div>
  );
}

export default Login;
