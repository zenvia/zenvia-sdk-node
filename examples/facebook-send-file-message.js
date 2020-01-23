/**
 * Example to send file messages using the Facebook channel.
 * 
 * Run:
 * ZENVIA_API_TOKEN=your-api-token FROM=sender-identifier TO=recipient-identifier node facebook-send-file-message.js
 */

// const { Client, FileContent } = require('@zenvia/sdk');
const { Client, FileContent } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const facebook = client.getChannel('facebook');

const content = new FileContent('https://github.com/zenvia/zenvia-openapi-spec/raw/master/assets/zenvia-logo-developers.png', 'image/png');

facebook.sendMessage(process.env.FROM, process.env.TO, content)
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
