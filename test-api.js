const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing API: https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/heroes');
    const response = await fetch('https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/heroes');

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('Response data type:', typeof data);
    console.log('Is array?', Array.isArray(data));

    if (Array.isArray(data)) {
      console.log('Array length:', data.length);
      if (data.length > 0) {
        console.log('First item keys:', Object.keys(data[0]));
        console.log('First item sample:', JSON.stringify(data[0], null, 2));
      }
    } else {
      console.log('Data keys:', Object.keys(data));
      console.log('Data sample:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
