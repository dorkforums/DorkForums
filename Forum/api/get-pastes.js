const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

    const searchQuery = req.query.search || '';
    const file = path.join(__dirname, '..', 'data', 'pastes.json');
    let pastes = [];
    try {
      const data = fs.readFileSync(file, 'utf8');
      pastes = JSON.parse(data);
    } catch (err) {
      pastes = [];
    }

    if (searchQuery) {
      pastes = pastes.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    pastes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.status(200).json({ success: true, count: pastes.length, pastes });
  } catch (error) {
    console.error('Error fetching pastes:', error);
    res.status(500).json({ error: 'Failed to fetch pastes' });
  }
};