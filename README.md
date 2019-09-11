# Zenvia SDK for Node.js

This SDK for [Node.js](https://nodejs.org/) was created based on the [Zenvia](https://www.zenvia.com/) [API](https://zenvia.github.io/zenvia-openapi-spec/).

[![License](https://img.shields.io/github/license/zenvia/zenvia-sdk-node.svg)](LICENSE)
[![Build Status](https://travis-ci.org/zenvia/zenvia-sdk-node.svg?branch=master)](https://travis-ci.org/zenvia/zenvia-sdk-node)
[![Coverage Status](https://coveralls.io/repos/github/zenvia/zenvia-sdk-node/badge.svg?branch=master)](https://coveralls.io/github/zenvia/zenvia-sdk-node?branch=master)
[![Codecov](https://codecov.io/gh/zenvia/zenvia-sdk-node/branch/master/graph/badge.svg)](https://codecov.io/gh/zenvia/zenvia-sdk-node)
[![Dependencies](https://img.shields.io/david/zenvia/zenvia-sdk-node.svg)](https://david-dm.org/zenvia/zenvia-sdk-node)

[![NPM](https://nodei.co/npm/@zenvia/sdk.png)](https://nodei.co/npm/@zenvia/sdk/)

[![Twitter Follow](https://img.shields.io/twitter/follow/ZenviaMobile.svg?style=social)](https://twitter.com/intent/follow?screen_name=ZenviaMobile)



## Table of Contents

- [Features:](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API Methods](#api-methods)
- [How to Contribute](#how-to-contribute)
- [Contributors](#contributors)



## Features:

- [x] Text message sending
- [x] File message sending
- [x] Template message sending
- [x] Subscription handling
- [x] Logging support



## Prerequisites

* [Sign up](https://www.zenvia.com/) from a Zenvia Account
* [Node.js](https://nodejs.org/)


#### Obtain an API Token

You need to create an `x-api-token` in the Zenvia [app](https://app.zenvia.com/).



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

// Initialize
const client = new zenvia.Client('YOUR_API_TOKEN');

// Getting the channel
const whatsapp = client.getChannel('whatsapp');

// Creating the text content
const content = new TextContent('some text message here');

// ES6
whatsapp.sendMessage(from, to, content)
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



## API Methods


### Messages

Use the `sendMessage` method to send text (`TextContent`), files (`FileContent`) or templates (`TemplateContent`) messages to your customers.

```js
const client = new Client('YOUR_API_TOKEN');
const sms = client.getChannel('sms');
const content = new TextContent('some text message');
const response = await sms.sendMessage(from, to, content);
```

The response can be an `IMessageResponse` object when successful or an `IError` object when error.

The content types can be:

| Name            | Description |
|-----------------|-------------|
| TextContent     | Used to send a text messages to your customer.
| FileContent     | Used to send a file messages to your customer.
| TemplateContent | Used to send a template messages to your customer.

The content support by channel is described below.

| Channel  | TextContent | FileContent | TemplateContent |
|----------|    :---:    |    :---:    |      :---:      |
| SMS      | X           |             |                 |
| WhatsApp | X           | X           | X               |
| Facebook | X           | X           |                 |


### Subscriptions

In subscription operations, you can subscribe to your webbook to receive messages or message status.


#### List subscriptions

Use the `listSubscriptions` method to list subscriptions.

```js
const client = new Client('YOUR_API_TOKEN');
const response = await client.listSubscriptions();
```

The response can be an array of `ISubscription` object when successful or an `IError` object when error.


#### Create a subscription

Use the `createSubscription` method to create a subscription. A subscription can be an `MessageSubscription` object when is the message or an `MessageStatusSubscription` object when is the message status.

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

The response can be an `ISubscription` object when successful or an `IError` object when error.


#### Get a subscription

Use the `getSubscription` method to get a subscription through subscription identifier.

```js
const client = new Client('YOUR_API_TOKEN');
const response = await client.getSubscription('bee13bc7-9618-47a5-8089-e30dc5c385d2');
```

The response can be an `ISubscription` object when successful or an `IError` object when error.


#### Update a subscription

Use the `updateSubscription` method to update a subscription through subscription identifier and the `IPartialSubscription` object.

```js
const client = new Client('YOUR_API_TOKEN');
const partialSubscription = {
  webhook: {
    url: 'https://your-new-webhook.company.com',
  },
};
const response = await client.updateSubscription('bee13bc7-9618-47a5-8089-e30dc5c385d2', partialSubscription);
```

The response can be an `ISubscription` object when successful or an `IError` object when error.


#### Delete a subscription

Use the `deleteSubscription` method to delete a subscription through subscription identifier.

```js
const client = new Client('YOUR_API_TOKEN');
const response = await client.deleteSubscription('bee13bc7-9618-47a5-8089-e30dc5c385d2');
```

The response can be an `IError` object when error.



## Contributing

Pull requests are always welcome!

Please see the [Contributors' Guide](CONTRIBUTING.md) for more information on contributing.



## License

[MIT](LICENSE.md)
