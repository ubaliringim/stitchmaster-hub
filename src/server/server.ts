import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Simple MySQL Connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sewing_admin_db'
});

// Get all employers
app.get('/api/employers', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM employers');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employers' });
  }
});

// Add new employer
app.post('/api/employers', async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO employers (name, email, role) VALUES (?, ?, ?)',
      [name, email, role]
    );
    res.json({ message: 'Employer added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding employer' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});