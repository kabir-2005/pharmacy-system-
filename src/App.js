import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MedicineList from "./components/MedicineList";
import AddMedicine from "./components/AddMedicine";
import EditMedicine from "./components/EditMedicine";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        {/* 🌟 Navigation Bar */}
        <Navbar />

        {/* 🧭 Page Routes */}
        <Routes>
          <Route path="/" element={<MedicineList />} />
          <Route path="/add" element={<AddMedicine />} />
          <Route path="/edit/:id" element={<EditMedicine />} />
        </Routes>

        {/* 🦶 Footer */}
        <footer
          style={{
            backgroundColor: "#a67c52",
            color: "white",
            textAlign: "center",
            padding: "15px 0",
            marginTop: "40px",
            fontFamily: "'Times New Roman', serif",
            fontSize: "14px",
          }}
        >
          © 2025 Pharmacy Management System | Designed by Kabir
        </footer>
      </Router>
    </div>
  );
}

export default App;
