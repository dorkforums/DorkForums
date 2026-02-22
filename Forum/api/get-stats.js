module.exports = (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const stats = {
      totalPastes: 1234,
      activeUsers: 200,
      totalUsers: 5678,
      pasteCategories: { code: 485, text: 342, config: 184, other: 223 },
      topContributors: [ { rank: 1, name: 'Zed', pastes: 156 }, { rank: 2, name: 'User1', pastes: 89 } ],
      communityStats: { totalViews: 45000, totalDownloads: 12000, averageRating: 4.5 },
      lastUpdated: new Date().toISOString(),
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};