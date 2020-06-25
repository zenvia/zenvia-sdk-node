/**
 * Example to send text messages using the WhatsApp channel.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token FROM=sender-identifier TO=recipient-identifier node whatsapp-send-text-message.js
 */

const { Client, TextContent } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const whatsapp = client.getChannel('whatsapp');

const content = new TextContent('Some text message');

whatsapp.sendMessage(process.env.FROM, process.env.TO, content)
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
