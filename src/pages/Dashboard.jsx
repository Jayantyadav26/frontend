import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure you import axios
import "../App.css";

function Dashboard() {
  const [username, setUsername] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate(); // ✅ Hook called at the top

  const goToPacking = () => navigate("/packing");
  const goToUnpack = () => navigate("/unpacking");
  const goToItem = () => navigate("/searchItem");
  const goToDelete = () => navigate("/deleteItem");

  // ✅ This is the corrected logout function
  const handleLogout = async () => {
    try {
      await axios.post(`${backendURL}/logout`);
      sessionStorage.removeItem("token");
      navigate("/"); // Go back to login
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed");
    }
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, [token]);

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <div className="dash-btns">
        <button onClick={goToPacking}>Packing</button>
        <button onClick={goToUnpack}>Unpack</button>
        <button onClick={goToItem}>Find Item</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
