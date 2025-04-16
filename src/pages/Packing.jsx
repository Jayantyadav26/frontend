import React, { useState } from "react";
import axios from "axios";
import "../App.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";

function packaging() {
  const [itemName, setItemName] = useState("");
  const [boxNumber, setBoxNumber] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/dashboard"); // Correct usage of navigate
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendURL}/packing`,
        { itemName, boxNumber },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Packed successfully!!!");
        setItemName("");
        setBoxNumber("");
      }
    } catch (err) {
      console.error(err);
      alert("Packing failed");
    }
  }
  return (
    <>
      <div className="heading">
        <h1>Packing</h1>
        <button onClick={goBack}>Back</button>
      </div>

      <h2>Enter item name and it's box number</h2>
      {/* <h1>Packaging</h1> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="itemName">Item Name</label>
        <input
          type="text"
          name="itemName"
          id="itemName"
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
          required
        />
        <label htmlFor="boxNumber">Box Number</label>
        <input
          type="number"
          name="boxNumber"
          id="boxNumber"
          onChange={(e) => setBoxNumber(e.target.value)}
          value={boxNumber}
          required
        />
        <button type="submit">Pack</button>
      </form>
    </>
  );
}

export default packaging;
