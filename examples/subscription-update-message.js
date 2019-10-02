/**
 * Example to update a webhook to receive messages.
 * 
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node subscription-update-message.js
 */

// const { Client, MessageSubscription } = require('@zenvia/sdk');
const { Client, MessageSubscription } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const subscription = new MessageSubscription(
  {
    url: 'https://my-new-webhook.company.com/'
  },
  {
    channel: 'whatsapp',
  }
);

client.updateSubscription('subscription-identifier', subscription)
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
