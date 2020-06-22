/**
 * Example to send location messages using the WhatsApp channel.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token FROM=sender-identifier TO=recipient-identifier node whatsapp-send-location-message.js
 */

const { Client, LocationContent } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const whatsapp = client.getChannel('whatsapp');

const content = new LocationContent(
  -46.511170,
  -23.442930,
  'Name of location',
  'Address of location',
  'URL'
);

whatsapp.sendMessage(process.env.FROM, process.env.TO, content)
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
