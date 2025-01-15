import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
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
    const [rows] = await pool.execute(`
      SELECT * FROM employers
    `);
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