const axios = require('axios');

// Replace with the server's IP address and port
const url = 'http://192.168.0.35:3000';

axios.get(url)
  .then((response) => {
    console.log('Response:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });