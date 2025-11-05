import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ================================
// ✅ Fetch All Medicines
// ================================
app.get("/api/medicines", (req, res) => {
  const sql = "SELECT * FROM Medicine";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching medicines:", err.message);
      return res.status(500).json({ error: "Database error while fetching medicines" });
    }
    res.json(results);
  });
});

// ================================
// ✅ Fetch a Single Medicine by ID (Edit Page)
// ================================
app.get("/api/medicines/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Medicine WHERE Medicine_ID = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching medicine by ID:", err.message);
      return res.status(500).json({ error: "Database error while fetching medicine" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.json(results[0]);
  });
});

// ================================
// ✅ Add a New Medicine
// ================================
app.post("/api/medicines", (req, res) => {
  const {
    Medicine_ID,
    Name,
    Category_ID,
    Manufacturer,
    Expiry_Date,
    Price,
    Quantity_in_Stock,
  } = req.body;

  // ✅ Convert to valid MySQL date if it's in ISO format
  let formattedDate = Expiry_Date;
  if (formattedDate && formattedDate.includes("T")) {
    formattedDate = formattedDate.split("T")[0];
  }

  const sql = `
    INSERT INTO Medicine 
    (Medicine_ID, Name, Category_ID, Manufacturer, Expiry_Date, Price, Quantity_in_Stock) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [Medicine_ID, Name, Category_ID, Manufacturer, formattedDate, Price, Quantity_in_Stock],
    (err) => {
      if (err) {
        console.error("❌ Error adding medicine:", err.message);
        return res.status(500).json({ error: err.message });
      }
      console.log(`✅ Medicine '${Name}' added successfully.`);
      res.json({ message: "✅ Medicine added successfully!" });
    }
  );
});

// ================================
// ✅ Update an Existing Medicine by ID
// ================================
app.put("/api/medicines/:id", (req, res) => {
  const { id } = req.params;
  let { Name, Manufacturer, Expiry_Date, Price, Quantity_in_Stock } = req.body;

  // ✅ Fix ISO Date Format (e.g., "2025-12-09T18:30:00.000Z" → "2025-12-09")
  if (Expiry_Date && Expiry_Date.includes("T")) {
    Expiry_Date = Expiry_Date.split("T")[0];
  }

  const sql = `
    UPDATE Medicine 
    SET Name = ?, Manufacturer = ?, Expiry_Date = ?, Price = ?, Quantity_in_Stock = ?
    WHERE Medicine_ID = ?
  `;

  db.query(sql, [Name, Manufacturer, Expiry_Date, Price, Quantity_in_Stock, id], (err, result) => {
    if (err) {
      console.error("❌ Error updating medicine:", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    console.log(`✅ Medicine ID ${id} updated successfully.`);
    res.json({ message: "✅ Medicine updated successfully!" });
  });
});

// ================================
// ✅ Delete a Medicine by ID
// ================================
app.delete("/api/medicines/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Medicine WHERE Medicine_ID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting medicine:", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    console.log(`🗑️ Medicine ID ${id} deleted successfully.`);
    res.json({ message: "✅ Medicine deleted successfully!" });
  });
});

// ================================
// 🚀 Start the Server
// ================================
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
