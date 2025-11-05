import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    Manufacturer: "",
    Expiry_Date: "",
    Price: "",
    Quantity_in_Stock: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch the specific medicine details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/medicines/${id}`)
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("❌ Error fetching medicine:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/medicines/${id}`, formData)
      .then(() => {
        alert("✅ Medicine updated successfully!");
        navigate("/");
      })
      .catch((err) => console.error("❌ Error updating medicine:", err));
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading medicine details...</p>;
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        backgroundColor: "#fff8e7",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(75, 63, 47, 0.3)",
        fontFamily: "'Times New Roman', serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#4b3f2f",
          marginBottom: "20px",
        }}
      >
        ✏️ Edit Medicine
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/** Reusable Label + Input Container */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>Manufacturer:</label>
          <input
            type="text"
            name="Manufacturer"
            value={formData.Manufacturer}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>Expiry Date:</label>
          <input
            type="date"
            name="Expiry_Date"
            value={formData.Expiry_Date?.split("T")[0] || ""}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>Price (₹):</label>
          <input
            type="number"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px" }}>Quantity in Stock:</label>
          <input
            type="number"
            name="Quantity_in_Stock"
            value={formData.Quantity_in_Stock}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#8b6b42")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#a67c52")}
          >
             Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

// 🎨 Shared styles for better alignment
const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #c2a97e",
  fontSize: "16px",
  outline: "none",
  width: "100%", // ensures all inputs align perfectly
  boxSizing: "border-box",
  backgroundColor: "#fdf6ee",
};

const buttonStyle = {
  backgroundColor: "#a67c52",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s",
};
