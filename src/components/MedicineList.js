import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch all medicines
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/medicines")
      .then((res) => {
        setMedicines(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching medicines:", err);
        setLoading(false);
      });
  }, []);

  // 🗑️ Delete medicine
  const deleteMedicine = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      axios
        .delete(`http://localhost:5000/api/medicines/${id}`)
        .then(() => {
          setMedicines(medicines.filter((m) => m.Medicine_ID !== id));
          alert("✅ Medicine deleted successfully!");
        })
        .catch((err) => console.error("❌ Error deleting medicine:", err));
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        backgroundColor: "#fff8e7",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(75, 63, 47, 0.3)",
        fontFamily: "'Times New Roman', serif",
      }}
    >
      <h2
        style={{
          color: "#4b3f2f",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        💊 Medicine Inventory
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading medicines...</p>
      ) : medicines.length === 0 ? (
        <p style={{ textAlign: "center" }}>No medicines found in the database.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead style={{ backgroundColor: "#a67c52", color: "white" }}>
            <tr>
              <th style={{ padding: "10px", border: "1px solid #d4c4a8" }}>ID</th>
              <th style={{ padding: "10px", border: "1px solid #d4c4a8" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid #d4c4a8" }}>Manufacturer</th>
              <th style={{ padding: "10px", border: "1px solid #d4c4a8" }}>Price (₹)</th>
              <th style={{ padding: "10px", border: "1px solid #d4c4a8" }}>Stock</th>
              <th style={{ padding: "10px", border: "1px solid #d4c4a8" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((m) => (
              <tr
                key={m.Medicine_ID}
                style={{
                  backgroundColor: "#f0e6d2",
                  borderBottom: "1px solid #d4c4a8",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e6d6b8")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0e6d2")
                }
              >
                <td style={{ padding: "8px" }}>{m.Medicine_ID}</td>
                <td style={{ padding: "8px" }}>{m.Name}</td>
                <td style={{ padding: "8px" }}>{m.Manufacturer}</td>
                <td style={{ padding: "8px" }}>₹{m.Price}</td>
                <td style={{ padding: "8px" }}>{m.Quantity_in_Stock}</td>

                {/* 🧭 Action Buttons */}
                <td style={{ padding: "8px" }}>
                  {/* ✏️ Edit Button */}
                  <button
                    onClick={() => navigate(`/edit/${m.Medicine_ID}`)}
                    style={{
                      backgroundColor: "#5b3701", // Dark brown
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontSize: "15px",
                      marginRight: "8px",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#4a2d01")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#5b3701")
                    }
                  >
                    Edit
                  </button>

                  {/* 🗑️ Delete Button */}
                  <button
                    onClick={() => deleteMedicine(m.Medicine_ID, m.Name)}
                    style={{
                      backgroundColor: "#a67c52",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontSize: "15px",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#8b6b42")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#a67c52")
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
