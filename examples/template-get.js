/**
 * Example to get a subscription.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node subscription-get.js
 */

// const { Client } = require('@zenvia/sdk');
const { Client } = require('../dist');

const client = new Client('GKkj0dSHDN60yLdkZzVyj4-osKlMQXQj-5d4');

client.getTemplate('eb5f5a45-c4f2-4086-8f41-6cc423d4fac8')
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
