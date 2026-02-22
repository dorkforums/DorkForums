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

    const store = getStore({ name: 'users' });
    let users = [];
    
    try {
      const existingData = await store.get('users_data');
      if (existingData) {
        users = JSON.parse(existingData);
      }
    } catch (err) {
      // No users
    }

    const userExists = users.some(u => u.username === username);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ exists: userExists }),
    };
  } catch (error) {
    console.error('Error checking user:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to check user' }),
    };
  }
};