const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { title, content, author, password } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content required' });

    const paste = {
      id: Date.now().toString(),
      title,
      content,
      author: author || 'Anonymous',
      date: new Date().toISOString().split('T')[0],
      views: 0,
      password: password || null,
      created_at: new Date().toISOString(),
    };

    const file = path.join(__dirname, '..', 'data', 'pastes.json');
    let pastes = [];
    try {
      const data = fs.readFileSync(file, 'utf8');
      pastes = JSON.parse(data);
    } catch (err) {
      pastes = [];
    }

    pastes.push(paste);
    fs.writeFileSync(file, JSON.stringify(pastes, null, 2), 'utf8');

    res.status(201).json({ success: true, message: 'Paste created successfully', paste });
  } catch (error) {
    console.error('Error creating paste:', error);
    res.status(500).json({ error: 'Failed to create paste' });
  }
};