const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { username, password } = req.body;
    const file = path.join(__dirname, '..', 'data', 'users.json');
    let users = [];
    try {
      const data = fs.readFileSync(file, 'utf8');
      users = JSON.parse(data);
    } catch (err) {
      users = [];
    }

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return res.status(200).json({ message: 'Login successful', redirect: 'Dorkbin.html', username });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};