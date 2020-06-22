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
        formattedName: 'Jhonnanthn Balsas',
        firstName: 'Jhonnanthn'
      },
      phones: [
        {
          phone: '5511982210992',
          type: 'CELL',
          waId: '+5511982210992',
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
