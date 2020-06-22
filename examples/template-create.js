/**
 * Example to create a template.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node template-create.js
 */

const { Client, Template } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const template = new Template(
  'Name of Template -SDK',
  'pt_BR',
  'WHATSAPP',
  'ACCOUNT_UPDATE',
  'senderId value',
  'mail@zenvia.com',
  {
    header: {
      type: 'MEDIA_DOCUMENT',
    },
    body: {
      type: 'TEXT_TEMPLATE',
      text: 'Hello, {{name}}. The ticket {{ticketId}} will be send to your mail.'
    },
    footer: {
      type: 'TEXT_FIXED',
      text: 'Zenvia Company.'
    }
  }
);

client.createTemplate(template)
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
