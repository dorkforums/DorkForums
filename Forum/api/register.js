const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

    const file = path.join(__dirname, '..', 'data', 'users.json');
    let users = [];
    try {
      const data = fs.readFileSync(file, 'utf8');
      users = JSON.parse(data);
    } catch (err) {
      users = [];
    }

    const existing = users.find(u => u.username === username);
    if (existing) return res.status(409).json({ error: 'Username already exists' });

    users.push({ username, password });
    fs.writeFileSync(file, JSON.stringify(users, null, 2), 'utf8');

    res.status(201).json({ message: 'Registration successful', redirect: 'Login.html' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};