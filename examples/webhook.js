/**
 * Example to receiving subscription events.
 * 
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node webhook.js
 */

// const { Client, WebhookController } = require('@zenvia/sdk');
const { Client, WebhookController } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const webhook = new WebhookController({
  messageEventHandler: (messageEvent) => {
    console.log('Message event:', messageEvent);
  },
  messageStatusEventHandler: (messageStatusEvent) => {
    console.log('Message status event:', messageStatusEvent);
  },
  client,
  url: 'https://my-webhook.company.com',
  channel: 'whatsapp',
});

webhook.on('listening', () => {
  console.log('Webhook is listening');
});

webhook.on('error', (error) => {
  console.error('Error:', error);
});

webhook.init();