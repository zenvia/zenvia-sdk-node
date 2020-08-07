/**
 * Example to show the report about current state of sessions (executions) of flows in a period.
 *
 * Run:
 * ZENVIA_API_TOKEN=your-api-token node reports-list-flow.js
 */

const { Client } = require('../dist');

const client = new Client(process.env.ZENVIA_API_TOKEN);
const reportClient = client.getFlowReportClient();

reportClient.getEntries({
  startDate: '2020-01-10',
})
.then(response => {
  console.log('Response:', response);
})
.catch(error => {
  console.log('Error:', error);
});
