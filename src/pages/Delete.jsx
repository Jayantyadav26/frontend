import React,{useState}from "react";
import { useNavigate } from "react-router-dom";

function Delete() {
  const [itemName, setItemName] = useState("");
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/dashboard"); // Correct usage of navigate
  };
  async function handleDelete(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendURL}/deleteItem`,
        { itemName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Deleted successfully!!!");
        setItemName("");
      }
    } catch (err) {
      console.error(err);
      alert("Deleting failed");
    }
  }
  return (
    <>
      <div className="heading">
        <h1>Delete an Item</h1>
        <button onClick={goBack}>Back</button>
      </div>
      <form onSubmit={handleDelete}>
        <label htmlFor="itemName">Item Name</label>
        <input
          type="text"
          name="itemName"
          id="itemName"
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
          required
        />  
        <button type="submit">Delete</button>
      </form>
    </>
  );
}

export default Delete;
