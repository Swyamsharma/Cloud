const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Use mysql2 with promise support

const app = express();
const port = 3000;

// MySQL connection
const pool = mysql.createPool({
    connectionLimit: 10, // Set the maximum number of connections
    user: 'postgres', // Replace with your MySQL user
    host: host_url,
    database: 'feedbackdb',
    password: 'postgres', // Replace with your MySQL password
    port: 3306, // Default MySQL port
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to handle feedback submission
app.post('/submit-feedback', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)', // Use ? for MySQL parameterized queries
            [name, email, message]
        );
        res.status(201).send('Feedback submitted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error submitting feedback');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
