import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();

// Configure CORS to allow requests from any origin
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));

app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // default XAMPP username
  password: '', // default XAMPP password
  database: 'sewing_admin_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get all employers
app.get('/api/employers', async (req, res) => {
  try {
    console.log('Fetching employers...');
    const [rows] = await pool.execute('SELECT * FROM employers');
    console.log('Employers fetched successfully:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching employers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});