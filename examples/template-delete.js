/**
 * Example to delete a template.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node template-delete.js
 */

const { Client } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);

client.deleteTemplate('template-identifier')
.then(() => {
  console.log('Template deleted');
})
.catch(error => {
  console.log('Error:', error);
});
