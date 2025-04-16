import React,{useState}from "react";
import axios from "axios";
import "../App.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";

function SearchItem(){
    const [itemName, setItemName] = useState("");
    const [details, setDeatails] = useState([]);
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/dashboard"); // Correct usage of navigate
    };

    async function handleSubmit(e){
        e.preventDefault();

        try{
            const response = await axios.post(`${backendURL}/item`, { itemName },{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if(response.status === 200){
                console.log(response.data);
                setDeatails(response.data);
            }
            
        }catch(err){
            console.error(err);
            alert("Searching failed");    
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
            setItemName("");
            setDeatails(details.filter((item) => item.itemNumber !== itemNumber));
          }
        } catch (err) {
          console.error(err);
          alert("Deleting failed");
        }
      }
      

    return(
        <>
        <div className="heading">
        <h1>Search an Item</h1>
        <button onClick={goBack}>Back</button>
      </div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="itemName">Item Name</label>
            <input type="text"  onChange={(e) => setItemName(e.target.value)} value={itemName} required/>
            <button type="submit">Search</button>
        </form>
        {details.length > 0 && (
            <div style={{ marginTop: "20px" }}>
                <h3>Details of {itemName}</h3>
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
                        {details.map((item) => (
                            <tr key={item.itemNumber || `${item.itemName}-${item.boxNumber}`}>
                                <td>{item.itemNumber || "—"}</td>
                                <td>{item.itemName}</td>
                                <td>{item.boxNumber}</td>
                                <td><button onClick={()=>handleDelete(item.itemNumber)}>Delete</button></td>
                            </tr>
                        ))}     
                    </tbody>
                </table>
            </div>
        )}  
        </>
    )
}   

export default SearchItem;