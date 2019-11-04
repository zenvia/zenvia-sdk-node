/**
 * Example to create a webhook to receive message status.
 * 
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node subscription-create-message-status.js
 */

// const { Client, MessageStatusSubscription } = require('@zenvia/sdk');
const { Client, MessageStatusSubscription } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const subscription = new MessageStatusSubscription(
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
