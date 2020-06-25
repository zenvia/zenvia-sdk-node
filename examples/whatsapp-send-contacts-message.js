/**
 * Example to send contacts messages using the WhatsApp channel.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token FROM=sender-identifier TO=recipient-identifier node whatsapp-send-contacts-message.js
 */

const { Client, ContactsContent } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

const whatsapp = client.getChannel('whatsapp');

const content = new ContactsContent(
  [
    {
      name: {
        formattedName: 'Number of Contact',
        firstName: 'First name'
      },
      phones: [
        {
          phone: '5511222222222',
          type: 'CELL',
          waId: '+5511222222222',
        }
      ]
    }
  ]
);

whatsapp.sendMessage(process.env.FROM, process.env.TO, content)
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
