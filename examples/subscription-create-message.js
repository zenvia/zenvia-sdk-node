/**
 * Example to create a webhook to receive messages.
 * 
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node subscription-create-message.js
 */

// const { Client, MessageSubscription } = require('@zenvia/sdk');
const { Client, MessageSubscription } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const subscription = new MessageSubscription(
  {
    url: 'https://my-webhook.company.com'
  },
  {
    channel: 'whatsapp',
  }
);

client.createSubscription(subscription)
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
