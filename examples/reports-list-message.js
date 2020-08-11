/**
 * Example to show the report about all messages sent and received in a period.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node reports-list-message.js
 */

const { Client } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);
const reportClient = client.getMessagesReportClient();

reportClient.getEntries({
  startDate: '2020-01-10',
  endDate: '2020-01-15',
})
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
