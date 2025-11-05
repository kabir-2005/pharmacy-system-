import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header
      style={{
        backgroundColor: "#a67c52", // warm brown
        color: "white",
        padding: "15px 0",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        letterSpacing: "0.5px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {/* 🧾 Brand Title */}
        <h2
          style={{
            marginRight: "40px",
            color: "#fff8e7",
            fontFamily: "'Times New Roman', serif",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          💊 Pharmacy Management
        </h2>

        {/* 🏠 Home */}
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontFamily: "'Times New Roman', serif",
            fontSize: "18px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#fff8e7")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          Home
        </Link>

        {/* ➕ Add Medicine */}
        <Link
          to="/add"
          style={{
            color: "white",
            textDecoration: "none",
            fontFamily: "'Times New Roman', serif",
            fontSize: "18px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#fff8e7")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          Add Medicine
        </Link>
      </nav>
    </header>
  );
}
