# Zenvia SDK for Node.js

This SDK for [Node.js](https://nodejs.org/) was created based on the [Zenvia](https://www.zenvia.com/) [API](https://zenvia.github.io/zenvia-openapi-spec/).

[![License](https://img.shields.io/github/license/zenvia/zenvia-sdk-node.svg)](LICENSE.md)
[![Build Status](https://travis-ci.com/zenvia/zenvia-sdk-node.svg?branch=master)](https://travis-ci.com/zenvia/zenvia-sdk-node)
[![Coverage Status](https://coveralls.io/repos/github/zenvia/zenvia-sdk-node/badge.svg?branch=master)](https://coveralls.io/github/zenvia/zenvia-sdk-node?branch=master)
[![Dependencies](https://img.shields.io/david/zenvia/zenvia-sdk-node.svg)](https://david-dm.org/zenvia/zenvia-sdk-node)

[![NPM](https://nodei.co/npm/@zenvia%2Fsdk.png)](https://nodei.co/npm/@zenvia/sdk/)

[![Twitter Follow](https://img.shields.io/twitter/follow/ZenviaMobile.svg?style=social)](https://twitter.com/intent/follow?screen_name=ZenviaMobile)



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

Use the `sendMessage` method to messages to your customers.

```js
// Text message using the SMS channel
const client = new Client('YOUR_API_TOKEN');
const sms = client.getChannel('sms');
const content = new TextContent('some text message');
const response = await sms.sendMessage('sender-identifier', 'recipient-identifier', content);
```

The response can be an `IMessage` object when successful or an `IError` object when an error occurs.

### Sending a batch

Content can be sent as a batch. In other words, sending a message with one or more content to one or multiple contacts. 

The following channels support the following contents to be sent as a batch:

| Channel  | TextContent | TemplateContent |
|----------|    :---:    |    :---:        |
| SMS      | X           |                 |
| WhatsApp |             | X               |

Use the `sendMessageBatch` method to send a batched content to your customers.

```js
// SMS batch
const client = new Client('YOUR_API_TOKEN');
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
  id: 'sender-recipient',
  name: 'My batch name',
  channel: 'sms',
  columnMapper: columnMapper,
  message: message,
};
const batch = client.sendMessageBatch('file', smsBatch);
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

If you inform the `client`, `url`, and `channel` fields, a subscription will be created. That is unless the subscription matching these configuration already exists.

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
