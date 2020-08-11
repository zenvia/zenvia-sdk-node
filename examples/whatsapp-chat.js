/**
 * Example to receiving message event and send text messages.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node whatsapp-chat.js
 */

// const { Client, Webhook } = require('@zenvia/sdk');
const { Client, WebhookController } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);
const whatsapp = client.getChannel('whatsapp');

const webhook = new WebhookController({
  messageEventHandler: (messageEvent) => {
    // Response sender and recipient
    const sender = messageEvent.message.to;
    const recipient = messageEvent.message.from;
    // Send back received text contents
    const contents = messageEvent.message.contents.filter(message => message.type === 'text');
    whatsapp.sendMessage(sender, recipient, ...contents);
  },
  client,
  url: 'https://my-webhook.company.com',
  channel: 'whatsapp',
});
webhook.init();
