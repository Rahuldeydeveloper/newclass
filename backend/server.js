const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Serve static files from the frontend directory
app.use(express.static('d:/html/frontend'));

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'WJ28@krhps',
  database: 'user_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Create user database and table if not exists
const createUserTable = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
)`;

db.query(createUserTable, (err, result) => {
  if (err) throw err;
  console.log('User table ready.');
});

// API endpoint to register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).send('Error registering user.');
    } else {
      res.status(200).send('User registered successfully.');
    }
  });
});

// API endpoint to login a user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).send('Error logging in.');
    } else if (results.length > 0) {
      res.status(200).send('Login successful.');
    } else {
      res.status(401).send('Invalid credentials.');
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
