const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3001
;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',       // MySQL host
    user: 'root',            // Replace with your MySQL username
    password: '0000',        // Replace with your MySQL password
    database: 'UserMessagesDB', // Replace with your database name
    port: 3306               // Explicitly specify the MySQL port
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

// POST route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send('Thank you for your message!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
