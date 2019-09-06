# Zenvia API

> A Zenvia API client for node.js.

## Table of Contents

- [Features:](#features)
- [Install](#install)
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

## Install

Install with [npm](http://github.com/zenapi/npm):

```
  npm install @zenvia/api-client
```

## Basic Usage

```JS
// ES5
var zenapi = require('@zenvia/api');

// ES6 or Typescript
import * as zenapi from '@zenvia/api';

// Initialize
const client = new zenapi.Client('YOUR_API_TOKEN');

// ES6
client.sendText('whatsapp', from, to, 'some text message here')
.then(response => {
  // do something here
})
.catch(error => {
  // handle error here
});

// ES8 or Typescript. NodeJS 7.6.0 or higher
try {
  const response = await client.sendText('whatsapp', from, to, 'some text message here');
  // do something here
} catch (error) {
  // handle error here
}
```

## API Methods

### Messages

Use the <code>sendMessage</code> method to send text messages, media/documents, and Message Templates messages to your customers.

```JS
const message = {
  recipient_type: 'individual',
  to: 'whatsapp-id',
  type: 'text',
  text: {
    body: 'Some text message',
  },
};
const response = await client.sendMessage(message);
```

The response includes a combination of following components: meta, messages (payload), and errors. See the API Responses documentation for more information.

The following shows an example of payload in a response; the meta and error objects are omitted for brevity.

```JS
{
  messages: [{ 
    id: "message-id" 
  }]
}
```

| Name  | Description |
|-------|-------------|
| id    |  Identifier for the newly created message.

Alternatively, you can use specific type message methods to send messages, such as:
- sendText
- sendImage
- sendDocument
- sendAudio
- sendVideo
- sendHSM

Where the first parameter is always the whatsapp-id destination and the second parameter is the specific message type structure.

### sendText

```JS
const textMessage = {
  body: 'some text message'
};

response = await client.sendImage('whatsapp-id', textMessage);
```

The textMessage parameter have the following structure:

| Name      | Required  | Description |
|-----------|-----------|-------------|
| body      | Yes       | The text of the text message, which can contain URLs and formatting. |

The third parameter is omitted in this example but is a boolean value that indicate if must include a URL preview when body message is URL. Defaul to true.


### sendImage

```JS
const imageMessage = {
  link: 'http(s)://the-url',
  caption: 'your-image-caption'
};

response = await client.sendImage('whatsapp-id', imageMessage);
```

The imageMessage parameter have the following structure:

| Name      | Required  | Description |
|-----------|-----------|-------------|
| id        | Yes, when link is not provided | The media object ID, which is returned when the media is successfully uploaded to the WhatsApp Business API Client.
| link      | Yes, when id is not provided | The protocol and URL of the image to be sent. Use only with HTTP/HTTPS URLs. |
| caption   | No        | Describes the specified image media. |

### sendDocument

```JS
const documentMessage = {
  link: 'http(s)://the-url',
  caption: 'your-image-caption'
};

response = await client.sendDocument('whatsapp-id', documentMessage);
```

The documentMessage parameter have the following structure:

| Name      | Required  | Description |
|-----------|-----------|-------------|
| id        | Yes, when link is not provided | The media object ID, which is returned when the media is successfully uploaded to the WhatsApp Business API Client.
| link      | Yes, when id is not provided | The protocol and URL of the document to be sent. Use only with HTTP/HTTPS URLs. |
| caption   | No        | Describes the specified document media. |

### sendAudio

```JS
const audioMessage = {
  link: 'http(s)://the-url'
};

response = await client.sendAudio('whatsapp-id', audioMessage);
```

The documentMessage parameter have the following structure:

| Name      | Required  | Description |
|-----------|-----------|-------------|
| id        | Yes, when link is not provided | The media object ID, which is returned when the media is successfully uploaded to the WhatsApp Business API Client.
| link      | Yes, when id is not provided | The protocol and URL of the audio to be sent. Use only with HTTP/HTTPS URLs. |

### sendVideo

```JS
const videoMessage = {
  link: 'http(s)://the-url',
  caption: 'your-image-caption'
};

response = await client.sendVideo('whatsapp-id', videoMessage);
```

The videoMessage parameter have the following structure:

| Name      | Required  | Description |
|-----------|-----------|-------------|
| id        | Yes, when link is not provided | The media object ID, which is returned when the media is successfully uploaded to the WhatsApp Business API Client.
| link      | Yes, when id is not provided | The protocol and URL of the video to be sent. Use only with HTTP/HTTPS URLs. |
| caption   | No        | Describes the specified video media. |

### sendHSM

```JS
const hsmMessage = {
  element_name: 'htk_005',
  namespace: 'e09ca868_df66_4eb9_9536_8301ca089765',
  language: { policy: 'deterministic', code: 'pt_BR' },
  localizable_params: [{ default: 'Wladi' }, { default: 'Drogas Delivery' }]
};

response = await client.sendHSM('whatsapp-id', hsmMessage);
```

The hsmMessage parameter have the following structure:

| Name               | Required  | Description |
|--------------------|-----------|-------------|
| namespace          | Yes       | The namespace that will be used. |
| element_name       | Yes       | The element name that indicates which template to use within the namespace. |
| language           | Yes       | Allows for the specification of a deterministic or fallback language. |
| localizable_params | Yes       | This field is an array of values to apply to variables in the template. |

The third parameter is omitted in this example but it is a number and provides the ability to set an expiration duration for messages (i.e., Time To Live). Businesses can use this to ensure that messages are delivered in a given time window. 

If the message is not delivered to the customer before the expiration period the message will expire and will not be delivered. You will get a failed callback notification with error code 410 when a sent message expires, but there won't be a delivery receipt because messages that expire will not be delivered. 

Default to 604800 seconds (7 days).

### Media

Use the media methods to upload, retrieve, or delete media.

#### Uploading Media

To upload media to the WhatsApp Business API client, use the <code>uploadMedia</code> method. The arguments must contain the binary media data and the string Content-Type to the type of the media being uploaded.

```JS
const mediaBuffer = readFileSync('~/sample-file.pdf');
response = await client.uploadMedia(mediaBuffer, 'application/pdf');
```

A successful response returns the id field, which is the information you need for retrieving messages and sending a media message to your customers.

```JS
{
  media: [{ 
    id: "media-id" 
  }]    
}
```

| Name  | Description |
|-------|-------------|
| id    |  Identifier for the newly uploaded media.


#### Downloading Media

Retrieving media is particularly useful when a user has uploaded an image that is sent to your Webhook. When a message with media is received, the WhatsApp Business API client will download the media. Once the media is downloaded, you will receive a notification through your webhook. Use the media ID found in that notification to retrieve the media.

```JS
buffer = await client.downloadMedia('3d2618b0-3c65-428f-a03d-8ae1c36008cd');
writeFileSync('~/dowloaded-file.pdf', buffer);
```

#### Deleting Media

To delete media in the WhatsApp Business API client, you will use <code>deleteMedia</code> with the ID of the media that you want to delete.

```JS
await client.deleteMedia('3d2618b0-3c65-428f-a03d-8ae1c36008cd');
```

## How to Contribute

TODO

## Contributors

TODO

## License

MIT
