/**
 * Example to get a subscription.
 * 
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node subscription-get.js
 */

// const { Client } = require('@zenvia/sdk');
const { Client } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

client.getSubscription('subscription-identifier')
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
