/**
 * Example to list templates.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node reports-list-message.js
 */

const { Client } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

client.listMessageReport()
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
