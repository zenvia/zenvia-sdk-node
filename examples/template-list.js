/**
 * Example to list templates.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node template-list.js
 */

const { Client } = require('../dist');

const client = new Client('GKkj0dSHDN60yLdkZzVyj4-osKlMQXQj-5d4');

client.listTemplates()
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
