/**
 * Example to receiving subscription events.
 * 
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node webhook.js
 */

// const { Client, Webhook } = require('@zenvia/sdk');
const { Client, Webhook } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const webhook = new Webhook({
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