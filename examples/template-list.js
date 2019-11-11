/**
 * Example to list subscriptions.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node subscription-list.js
 */

// const { Client } = require('@zenvia/sdk');
const { Client } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

client.listTemplates()
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
