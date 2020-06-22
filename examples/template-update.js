/**
 * Example to update a template.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node template-update.js
 */

const { Client, PartialTemplate } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const template = new PartialTemplate(
  'mail@zenvia.com,mail_2@zenvia.com',
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

client.updateTemplate('template-identifier', template)
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
