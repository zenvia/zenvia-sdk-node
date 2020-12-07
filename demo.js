var zenvia = require('./src/lib/client');

const client = new zenvia.Client('K1j_502vq3v6sLYYtva9XvRiy2KyAQWYgUxe');

const columnMapper = {
  "recipient_header_name": "recipient_number_column",
  "name": "recipient_name_column",
  "protocol": "protocol_column"
};

const message = {
  from: '35a6b936-d1c3-4234-8d10-3e7e04a462dc',
  contents: [
    { 
        type: 'text',
        text: 'Hello {{name}} your service protocol is number {{protocol}}',
    },
  ],
}

const smsBatch = {
  id: '35a6b936-d1c3-4234-8d10-3e7e04a462dc',
  name: 'First SMS batch',
  channel: 'sms',
  columnMapper: columnMapper,
  message: message,
};

const batch = client.sendBatchFile('./notification_file.csv', smsBatch);

console.log(batch);