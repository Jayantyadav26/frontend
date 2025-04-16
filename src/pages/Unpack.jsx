import React, { useState } from "react";
import axios from "axios";
import "../App.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";

function Unpack() {
  const [boxNumber, setBoxNumber] = useState("");
  const [displayBox, setDisplayBox] = useState("");
  const [items, setItems] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const token = sessionStorage.getItem("token"); // Just use it directly
  //   console.log('Token:', token);  // Check if the token is being retrieved correctly
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/dashboard"); // Correct usage of navigate
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendURL}/unpack`,
        { boxNumber },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // alert("Unpacked successfully!!!");
        console.log(response.data);
        setItems(response.data);
        setDisplayBox(boxNumber);
        setBoxNumber("");
      }
    } catch (err) {
      console.error(err);
      alert("Unpacking failed");
    }
  }

  async function handleDelete(itemNumber) {
    try {
      const response = await axios.post(
        `${backendURL}/deleteItem`,
        { itemNumber },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert("Deleted successfully!!!");
        setItems(items.filter((item) => item.itemNumber !== itemNumber));
      }
    } catch (err) {
      console.error(err);
      alert("Deleting failed");
    }
  }
  

  return (
    <div>
      <div className="heading">
        <h1>Unpacking</h1>
        <button onClick={goBack}>Back</button>
      </div>

      <h2>Enter box number</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="boxNumber">Box Number</label>
        <input
          type="number"
          name="boxNumber"
          id="boxNumber"
          value={boxNumber}
          onChange={(e) => setBoxNumber(e.target.value)}
          required
        />
        <button type="submit">Unpack</button>
      </form>

      {items.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Items in Box #{displayBox}</h3>
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Box Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.itemNumber || `${item.itemName}-${item.boxNumber}`}
                >
                  <td>{item.itemNumber || "—"}</td>
                  <td>{item.itemName}</td>
                  <td>{item.boxNumber}</td>
                  <td><button onClick={()=>handleDelete(item.itemNumber)}>Unpack</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Unpack;
