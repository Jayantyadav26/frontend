import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import
import { useNavigate } from 'react-router-dom';
import "../App.css"; // Import your CSS file

function Dashboard() {
  const [username, setUsername] = useState('');
  // const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate() // Correct usage of useNavigate

  const goToPacking = () =>{
    navigate('/packing'); // Correct usage of navigate
  }

  const goToUnpack = () =>{
    navigate('/unpacking'); // Correct usage of navigate
  }

  const goToItem = () =>{
    navigate('/searchItem'); // Correct usage of navigate
  }
  const goToDelete = () =>{
    navigate('/deleteItem'); // Correct usage of navigate
  }
  

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token); // Direct usage of jwt_decode
        // console.log(decoded.username); // Log the decoded token for debugging
        setUsername(decoded.username); // Set username from decoded token
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
  }, [token]); // Adding token as dependency

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <div className='dash-btns'>
      <button onClick={goToPacking}>Packing</button>
      <button onClick={goToUnpack}>Unpack</button>
      <button onClick={goToItem}>Find Item</button>
      {/* <button onClick={goToDelete}>Delete</button> */}
      </div>
    </div>
  );
}

export default Dashboard;
