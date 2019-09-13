/**
 * Example to send text messages using the SMS channel.
 * 
 * Run:
 * ZENVIA_API_TOKEN=your-api-token FROM=sender-identifier TO=recipient-identifier node sms-send-text-message.js
 */

// const { Client, TextContent } = require('@zenvia/sdk');
const { Client, TextContent } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const sms = client.getChannel('sms');

const content = new TextContent('Some text message');

sms.sendMessage(process.env.FROM, process.env.TO, content)
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
