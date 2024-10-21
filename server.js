
// Importing required packages
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Creating an Express application
const app = express();
app.use(bodyParser.json()); // Middleware for parsing JSON requests

// MySQL database connection
const connection = mysql.createConnection({
    host: '3306',     // Database host
    user: 'root',          // Database user
    password: 'admin', // Your MySQL password
    database: 'ecommerce'  // Name of the database
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the MySQL database as id ' + connection.threadId);
});

// Endpoint to get all dresses
app.get('/dresses', (req, res) => {
    connection.query('SELECT * FROM dresses', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Endpoint to add an order
app.post('/add-order', (req, res) => {
    const { dress_id, user_address, quantity, phone_number } = req.body;

    const query = 'INSERT INTO orders (dress_id, user_address, quantity, phone_number) VALUES (?, ?, ?, ?)';
    connection.query(query, [dress_id, user_address, quantity, phone_number], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Order placed successfully', orderId: results.insertId });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
