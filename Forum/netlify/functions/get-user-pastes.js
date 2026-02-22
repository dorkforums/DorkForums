const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  try {
    const username = event.queryStringParameters?.username;
    if (!username) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Username required' }),
      };
    }

    const store = getStore({ name: 'pastes' });
    let pastes = [];
    try {
      const existingData = await store.get('pastes_data');
      if (existingData) {
        pastes = JSON.parse(existingData);
      }
    } catch (err) {
      // If no data, return empty
    }

    // Filter by author
    const userPastes = pastes.filter(paste => paste.author === username);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(userPastes),
    };
  } catch (error) {
    console.error('Error fetching user pastes:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to fetch pastes' }),
    };
  }
};