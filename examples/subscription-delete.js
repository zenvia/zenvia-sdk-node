/**
 * Example to delete a subscription.
 * 
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node subscription-delete.js
 */

// const { Client } = require('@zenvia/sdk');
const { Client } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

client.deleteSubscription('subscription-identifier')
.then(() => {
  console.log('Subscription deleted');
})
.catch(error => {
  console.log('Error:', error);
});
