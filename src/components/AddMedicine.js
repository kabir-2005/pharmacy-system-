import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddMedicine() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Medicine_ID: "",
    Name: "",
    Category_ID: "",
    Manufacturer: "",
    Expiry_Date: "",
    Price: "",
    Quantity_in_Stock: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit the new medicine
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !form.Medicine_ID ||
      !form.Name ||
      !form.Category_ID ||
      !form.Manufacturer ||
      !form.Expiry_Date ||
      !form.Price ||
      !form.Quantity_in_Stock
    ) {
      alert("⚠️ Please fill out all fields!");
      return;
    }

    setLoading(true);

    axios
      .post("http://localhost:5000/api/medicines", form)
      .then(() => {
        alert("✅ Medicine added successfully!");
        navigate("/"); // Redirect to home page after success
      })
      .catch((err) => {
        console.error("❌ Error adding medicine:", err);
        alert("Something went wrong while adding the medicine.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      style={{
        maxWidth: "700px",
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
        ➕ Add New Medicine
      </h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div>
            <label style={{ fontWeight: "bold" }}>Medicine ID:</label>
            <input
              type="number"
              name="Medicine_ID"
              value={form.Medicine_ID}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Name:</label>
            <input
              type="text"
              name="Name"
              value={form.Name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Category ID:</label>
            <input
              type="number"
              name="Category_ID"
              value={form.Category_ID}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Manufacturer:</label>
            <input
              type="text"
              name="Manufacturer"
              value={form.Manufacturer}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Expiry Date:</label>
            <input
              type="date"
              name="Expiry_Date"
              value={form.Expiry_Date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Price (₹):</label>
            <input
              type="number"
              name="Price"
              value={form.Price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Quantity in Stock:</label>
            <input
              type="number"
              name="Quantity_in_Stock"
              value={form.Quantity_in_Stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#a67c52",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#8b6b42")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#a67c52")
            }
          >
            {loading ? "Adding..." : "Add Medicine"}
          </button>
        </div>
      </form>
    </div>
  );
}
