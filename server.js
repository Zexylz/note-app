const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./love_notes.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the love_notes database.');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS love_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    to_person TEXT,
    from_person TEXT,
    content TEXT,
    date TEXT
)`);

// Get all love notes
app.get('/api/notes', (req, res) => {
    db.all("SELECT * FROM love_notes ORDER BY date DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add a new love note
app.post('/api/notes', (req, res) => {
    const { to, from, content } = req.body;
    const date = new Date().toISOString();

    db.run(`INSERT INTO love_notes (to_person, from_person, content, date) VALUES (?, ?, ?, ?)`,
        [to, from, content, date], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID });
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});