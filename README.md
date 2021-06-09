# Zenvia SDK for Node.js

This SDK for [Node.js](https://nodejs.org/) was created based on the [Zenvia](https://www.zenvia.com/) [API](https://zenvia.github.io/zenvia-openapi-spec/).

[![License](https://img.shields.io/github/license/zenvia/zenvia-sdk-node.svg)](LICENSE.md)
[![Build Status](https://travis-ci.com/zenvia/zenvia-sdk-node.svg?branch=master)](https://travis-ci.com/zenvia/zenvia-sdk-node)
[![Coverage Status](https://coveralls.io/repos/github/zenvia/zenvia-sdk-node/badge.svg?branch=master)](https://coveralls.io/github/zenvia/zenvia-sdk-node?branch=master)
[![Dependencies](https://img.shields.io/david/zenvia/zenvia-sdk-node.svg)](https://david-dm.org/zenvia/zenvia-sdk-node)

[![NPM](https://nodei.co/npm/@zenvia%2Fsdk.png)](https://nodei.co/npm/@zenvia/sdk/)

[![Twitter Follow](https://img.shields.io/twitter/follow/ZENVIA_.svg?style=social)](https://twitter.com/intent/follow?screen_name=ZENVIA_)



## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Getting Started](#getting-started)
  - [Sending your first message](#sending-your-first-message)
  - [Sending a batch](#sending-a-batch)
  - [Subscribe for messages](#subscribe-for-messages)
  - [Subscribe for message status](#subscribe-for-message-status)
  - [Receiving message events and message status events](#receiving-message-events-and-message-status-events)
  - [Getting message reports](#getting-message-reports)
  - [Getting flow reports](#getting-a-flow-reports)
  - [Listing your templates](#listing-your-templates)
- [Contributing](#contributing)
- [License](#license)

## Features

- [x] Text message content
- [x] File message content
- [x] Location message content
- [x] Contacts message content
- [x] Template message content
- [x] Send batches
- [x] Subscription handling
- [x] Get reports
- [x] CRUD operations on templates
- [x] Logging support



## Prerequisites

* [Sign up](https://www.zenvia.com/) for a Zenvia Account
* [Node.js](https://nodejs.org/)
* Generate an API token in the [Zenvia API console](https://app.zenvia.com/home/api)
* Use you account's User ID as the sender identifier when sending any message. You can find it at the [Zenvia Platform](https://app.zenvia.com/welcome)



## Installation

```shell
npm install @zenvia/sdk
```



## Basic Usage


```JS
// ES5
var zenvia = require('@zenvia/sdk');

// ES6 or Typescript
import * as zenvia from '@zenvia/sdk';

// Initialization with your API token (x-api-token)
const client = new zenvia.Client('YOUR_API_TOKEN');

// Choosing the channel
const whatsapp = client.getChannel('whatsapp');

// Creating a text content
const content = new zenvia.TextContent('some text message here');

// ES6
whatsapp.sendMessage('sender-identifier', 'recipient-identifier', content)
.then(response => {
  // do something here
})
.catch(error => {
  // handle error here
});

// ES8 or Typescript. NodeJS 7.6.0 or higher
try {
  const response = await whatsapp.sendMessage('sender-identifier', 'recipient-identifier', content);
  // do something here
} catch (error) {
  // handle error here
}
```



## Getting Started

Examples not listed on this section can be found [here](examples).

### Sending your first message

The content types that can be sent are:

| Name            | Description |
|-----------------|-------------|
| TextContent     | Used to send text messages to your customer.
| FileContent     | Used to send file messages to your customer.
| LocationContent | Used to send location messages to your customer.
| ContactsContent | Used to send contacts messages to your customer.
| TemplateContent | Used to send template messages to your customer.

The channels that can be used to send the content are:

| Channel  | TextContent | FileContent | LocationContent | ContactsContent | TemplateContent |
|----------|    :---:    |    :---:    |      :---:      |      :---:      |      :---:      |
| SMS      | X           |             |                 |                 |                 |
| RCS      | X           | X           |                 |                 |                 |
| WhatsApp | X           | X           | X               | X               | X               |
| Facebook | X           | X           |                 |                 |                 |
| Instagram| X           | X           |                 |                 |                 |

Use the `sendMessage` method to messages to your customers.

```js
// Text message using the SMS channel
const client = new Client('YOUR_API_TOKEN');
const sms = client.getChannel('sms');
const content = new TextContent('some text message');
const response = await sms.sendMessage('sender-identifier', 'recipient-identifier', content);
```

The response can be an `IMessage` object when successful or an `IError` object when an error occurs.

### Sending a message batch

Content can be sent as a batch. In other words, sending a message with one or more content to one or multiple contacts. You'll need to send a file and comply with the required fields for each type of batch

The following channels support the following contents to be sent as a batch:

| Channel  | TextContent | TemplateContent |
|----------|    :---:    |    :---:        |
| SMS      | X           |                 |
| WhatsApp |             | X               |

Use the `sendMessageBatch` method to send a batched content to your customers.

```js
// SMS nessage batch

const client = new Client('YOUR_API_TOKEN');
const smsBatch = {
  name: 'My first SMS batch',
  channel: 'sms',
  message: {
    from: 'sender-identifier',
    contents: [
      {
        type: 'text',
        text: 'first text message',
      },
      {
        type: 'text',
        text: 'second text message',
      },
    ],
  },
  columnMapper: {
    "recipient_header_name": "recipient_number_column",
    "name": "recipient_name_column",
    "protocol": "protocol_column",
  },
};
const batch = client.sendMessageBatch('./path/file.csv', smsBatch);
```

You may choose to send the content as a string or an array of strings instead of an array of objects. For that, you need to instanciate the `WhatsAppMessageBatch` class to send a batched WhatsApp template message or `SmsMessageBatch` class when sending a batched SMS text message.

Additionally, instead of sending a file you can send the contents of the file as a stream for both WhatsApp and SMS message batches.

```js
// WhatsApp message batch

/**
 * stream is core Node.js module
 */
import { Readable } from 'stream';

const client = new Client('SOME_TOKEN');
const contents = [
  'a whatsapp template id',
  'another whatsapp template id',
];
const columnMapper = {
  "recipient_header_name": "recipient_number_column",
  "name": "recipient_name_column",
  "protocol": "protocol_column",
};
const whatsAppBatch = new WhatsAppMessageBatch(
  'My first WhatsApp batch',
  'sender-identifier',
  contents,
  columnMapper,
);
const readStream = Readable.from("telefone\n5511999999999");
const batch = client.sendMessageBatch(readstream, smsBatch);
```

The response can be an `IBatch` object when successful or an `IError` object when an error occurs.

### Subscribe for messages

Use the `createSubscription` method to create a `MessageSubscription` object for message subscriptions.

```js
const client = new Client('YOUR_API_TOKEN');
const subscription = new MessageSubscription({
  url: 'https://your-webhook.company.com'
},
{
  channel: 'sms'
});
const response = await client.createSubscription(subscription);
```

The response can be an `ISubscription` object when successful or an `IError` object on errors.


### Subscribe for message status

Use the `createSubscription` method to create a `MessageStatusSubscription` object for message status subscriptions.

```js
const client = new Client('YOUR_API_TOKEN');
const subscription = new MessageStatusSubscription({
  url: 'https://your-webhook.company.com'
},
{
  channel: 'sms'
});
const response = await client.createSubscription(subscription);
```

The response can be an `ISubscription` object when successful or an `IError` object when an error occurs.


### Receiving message events and message status events

Use the `WebhookController` class to create your webhook so you can receive message events and message status events. The default port is `3000`.

If you inform the `client`, `url`, and `channel` fields, a subscription will be created, unless a subscription matching these configuration already exists.

In the `messageEventHandler` field you will receive the message events and in the `messageStatusEventHandler` field you will receive the message status events.

```js
const client = new Client(process.env.ZENVIA_API_TOKEN);
const webhook = new WebhookController({
  messageEventHandler: (messageEvent) => {
    console.log('Message event:', messageEvent);
  },
  messageStatusEventHandler: (messageStatusEvent) => {
    console.log('Message status event:', messageStatusEvent);
  },
  client,
  url: 'https://my-webhook.company.com',
  channel: 'whatsapp',
});
webhook.init();
```

To receive events running the [example](examples/webhook.js) on your machine, we suggest [ngrok](https://ngrok.com/).


### Getting message reports

To get information on how many messages you've sent or have received during a period of time, use the `getEntries` method to list `IReportMessagesEntry` objects as shown below.

```js
const client = new Client('YOUR_API_TOKEN');
const reportClient = client.getMessagesReportClient();
const response = await reportClient.getEntries({
  startDate: '2020-01-10',
  endDate: '2020-01-15',
});
```

The response can be an array of `IReportMessagesEntry` objects when successful or an `IError` object when an error occurs.

### Getting flow reports

In order to get information about the current state of sessions (executions) of flows in a period of time, use the `getEntries` method to list `IReportFlowEntry` objects as shown below.

```js
const client = new Client('YOUR_API_TOKEN');
const reportClient = client.getFlowReportClient();
const response = await reportClient.getEntries({ startDate: '2020-01-10' });
```

The response can be an array of `IReportFlowEntry` objects when successful or an `IError` object when an error occurs.

### Listing your templates

You can execute CRUD operations on templates. For example, use the `listTemplates` method to list an `ITemplate` object.

```js
const client = new Client('YOUR_API_TOKEN');
const response = await client.listTemplates();
```

The response will be an array of `ITemplate` object.



## Contributing

Pull requests are always welcome!

Please consult the [Contributors' Guide](CONTRIBUTING.md) for more information on contributing.



## License

[MIT](LICENSE.md)
