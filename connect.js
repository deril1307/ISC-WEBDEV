import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Set middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Register form
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

// Handle form register
app.post("/register", (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.redirect("/register?error=password_mismatch");
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.redirect("/register?error=server_error");
    }

    const sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.redirect("/register?error=duplicate_entry");
        }
        console.error("Database error:", err);
        return res.redirect("/register?error=database_error");
      }

      res.redirect("/index.html?success=registration");
    });
  });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM user WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Database error");
    }
    if (results.length === 0) {
      return res.redirect("/login.html?error=invalid_credentials");
    }
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("Server error");
      }
      if (isMatch) {
        res.redirect("/loginberhasil.html?success=login");
      } else {
        res.redirect("/login.html?error=invalid_credentials");
      }
    });
  });
});

// Serve the account page with username
app.get("/account", (req, res) => {
  res.sendFile(path.join(__dirname, "account.html"));
});

// API endpoint to get user info
app.get("/api/user-info", (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  const sql = "SELECT username FROM user WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Database error");
    }

    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    const username = results[0].username;
    res.json({ username });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
