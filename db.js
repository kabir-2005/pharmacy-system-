import mysql from "mysql2";

// ✅ Create MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kanha12$$$", // ⚠️ Make sure this matches your MySQL root password
  database: "PharmacyDB", // ✅ Case-sensitive on some systems
});

// ✅ Connect to Database
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully to 'PharmacyDB'");
  }
});

export default db;
