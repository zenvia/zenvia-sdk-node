/**
 * Example to list templates.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node reports-list-message.js
 */

const { Client } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

client.listMessageReport('2020-01-10', '2020-01-20')
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
