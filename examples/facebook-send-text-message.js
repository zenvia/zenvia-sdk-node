/**
 * Example to send text messages using the Facebook channel.
 * 
 * Run:
 * ZENVIA_API_TOKEN=your-api-token FROM=sender-identifier TO=recipient-identifier node facebook-send-text-message.js
 */

// const { Client, TextContent } = require('@zenvia/sdk');
const { Client, TextContent } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const facebook = client.getChannel('facebook');

const content = new TextContent('Some text message');

facebook.sendMessage(process.env.FROM, process.env.TO, content)
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
