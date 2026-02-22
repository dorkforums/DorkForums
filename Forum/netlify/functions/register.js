const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Username and password required' }) };
    }

    const store = getStore({ name: 'users' });
    let users = [];
    
    try {
      const existingData = await store.get('users_data');
      if (existingData) {
        users = JSON.parse(existingData);
      }
    } catch (err) {
      // No users yet
    }

    // Check if username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return { statusCode: 409, body: JSON.stringify({ error: 'Username already exists' }) };
    }

    // Add new user
    users.push({ username, password });
    await store.set('users_data', JSON.stringify(users));

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Registration successful', redirect: 'Login.html' }),
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Registration failed' }),
    };
  }
};