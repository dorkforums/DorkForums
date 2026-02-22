const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const username = req.query.username;
    if (!username) return res.status(400).json({ error: 'Username required' });

    const file = path.join(__dirname, '..', 'data', 'pastes.json');
    let pastes = [];
    try {
      const data = fs.readFileSync(file, 'utf8');
      pastes = JSON.parse(data);
    } catch (err) {
      pastes = [];
    }

    const userPastes = pastes.filter(p => p.author === username);
    res.status(200).json(userPastes);
  } catch (error) {
    console.error('Error fetching user pastes:', error);
    res.status(500).json({ error: 'Failed to fetch pastes' });
  }
};