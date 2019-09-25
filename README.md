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
  - [Sending your first message](#sending-your-first-message)
  - [Subscribe for messages](#subscribe-for-messages)
  - [Subscribe for message status](#subscribe-for-message-status)
  - [Receiving message and message status events](#receiving-message-and-message-status-events)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)



## Features

- [x] Text message content
- [x] File message content
- [x] Template message content
- [x] Subscription handling
- [x] Logging support



## Prerequisites

* [Sign up](https://www.zenvia.com/) for a Zenvia Account
* [Node.js](https://nodejs.org/)


#### Obtain an API Token

You need to create an API token in the Zenvia [API console](https://app.zenvia.com/home/api).



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
const content = new TextContent('some text message here');

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
  const response = await whatsapp.sendMessage(from, to, content);
  // do something here
} catch (error) {
  // handle error here
}
```



## Getting Started


### Sending your first message

Use the `sendMessage` method to send text (`TextContent`), file (`FileContent`) or template (`TemplateContent`) messages to your customers.

```js
const client = new Client('YOUR_API_TOKEN');
const sms = client.getChannel('sms');
const content = new TextContent('some text message');
const response = await sms.sendMessage('sender-identifier', 'recipient-identifier', content);
```

The response can be an `IMessageResponse` object when successful or an `IError` object on errors.

The content types can be:

| Name            | Description |
|-----------------|-------------|
| TextContent     | Used to send text messages to your customer.
| FileContent     | Used to send file messages to your customer.
| TemplateContent | Used to send template messages to your customer.

The content support by channel is described below.

| Channel  | TextContent | FileContent | TemplateContent |
|----------|    :---:    |    :---:    |      :---:      |
| SMS      | X           |             |                 |
| WhatsApp | X           | X           | X               |
| Facebook | X           | X           |                 |


### Subscribe for messages

Use the `createSubscription` method to create an `MessageSubscription` object for message subscriptions.

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

Use the `createSubscription` method to create an `MessageStatusSubscription` object for message status subscriptions.

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

The response can be an `ISubscription` object when successful or an `IError` object on errors.


### Receiving message and message status events

Use the `Webhook` class to create your webhook to receive message and message status events. The default port is `3000`.

If you inform the `client`, `url`, and `channel` fields, a subscription will be created if it does not exist for these configurations.

In the `messageEventHandler` field you will receive the message events and in the `messageStatusEventHandler` field you will receive the message status events.

```js
const client = new Client(process.env.ZENVIA_API_TOKEN);
const webhook = new Webhook({
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

To receive events running the [example](examples/webhook.js) on your machine, you can use [ngrok](https://ngrok.com/).


Other examples can be found [here](examples).



## Contributing

Pull requests are always welcome!

Please see the [Contributors' Guide](CONTRIBUTING.md) for more information on contributing.



## License

[MIT](LICENSE.md)
