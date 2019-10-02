/**
 * Example to send template messages using the WhatsApp channel.
 * 
 * Run:
 * ZENVIA_API_TOKEN=your-api-token FROM=sender-identifier TO=recipient-identifier node whatsapp-send-template-message.js
 */

// const { Client, TemplateContent } = require('@zenvia/sdk');
const { Client, TemplateContent } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const whatsapp = client.getChannel('whatsapp');

const content = new TemplateContent('template-identifier', { key: 'value' });

whatsapp.sendMessage(process.env.FROM, process.env.TO, content)
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
