import * as nock from 'nock';
import * as rp from 'request-promise';
import { Client, WebhookController, IFileContent, IJsonContent, ITextContent, IWebhookOptions, IMessageEvent, IMessageStatusEvent } from '../../src';

describe('Webook', () => {

  it('should receive message event with text content', async () => {
    const options = {} as IWebhookOptions;
    const webhook = new WebhookController(options);

    webhook.on('error', (error) => {
      throw error;
    });

    webhook.init();

    const body = {
      id: '3fcdb9f9-a44d-4bb2-944c-84cc104e2e9d',
      timestamp: '2019-09-13T22:50:16.585Z',
      type: 'MESSAGE',
      subscriptionId: '5d0f95c8-2430-4337-8077-df9c5a751354',
      channel: 'sms',
      direction: 'IN',
      message: {
        from: 'FROM',
        to: 'TO',
        direction: 'IN',
        channel: 'sms',
        contents: [
          {
            type: 'text',
            text: 'some text message',
          },
        ],
      },
    };

    try {
      const response = await rp.post({
        uri: 'http://localhost:3000',
        body,
        json: true,
        resolveWithFullResponse: true,
      });

      response.statusCode.should.be.equal(200);
      response.request.uri.path.should.be.equal('/');
    } catch (error) {
      throw error;
    }

    webhook.close();
  });

  it('should receive message event an array of content', async () => {
    const options = {
      port: 3001,
      path: '/events',
      messageEventHandler: (messageEvent: IMessageEvent) => {
        messageEvent.id.should.be.equal('3fcdb9f9-a44d-4bb2-944c-84cc104e2e9d');
        messageEvent.timestamp.should.be.equal('2019-09-13T22:50:16.585Z');
        messageEvent.type.should.be.equal('MESSAGE');
        messageEvent.subscriptionId.should.be.equal('5d0f95c8-2430-4337-8077-df9c5a751354');
        messageEvent.channel.should.be.equal('whatsapp');
        messageEvent.direction.should.be.equal('IN');
        messageEvent.message.from.should.be.equal('FROM');
        messageEvent.message.to.should.be.equal('TO');
        messageEvent.message.direction.should.be.equal('IN');
        messageEvent.message.channel.should.be.equal('whatsapp');

        const textContent = messageEvent.message.contents[0] as ITextContent;
        textContent.type.should.be.equal('text');
        textContent.text.should.be.equal('Some message');

        const fileContent = messageEvent.message.contents[1] as IFileContent;
        fileContent.type.should.be.equal('file');
        fileContent.fileUrl.should.be.equal('http://domain.com/some-image.png');
        fileContent.fileMimeType.should.be.equal('image/png');
        fileContent.fileCaption.should.be.equal('Some image');

        const jsonContent = messageEvent.message.contents[2] as IJsonContent;
        jsonContent.type.should.be.equal('json');
        jsonContent.payload.visitor.name.should.be.equal('Some name');
        jsonContent.payload.visitor.firstName.should.be.equal('First name');
        jsonContent.payload.visitor.lastName.should.be.equal('Last name');
        jsonContent.payload.visitor.picture.should.be.equal('http://domain.com/some-image.png');
      },
    } as IWebhookOptions;
    const webhook = new WebhookController(options);

    webhook.on('error', (error) => {
      throw error;
    });

    webhook.init();

    const body = {
      id: '3fcdb9f9-a44d-4bb2-944c-84cc104e2e9d',
      timestamp: '2019-09-13T22:50:16.585Z',
      type: 'MESSAGE',
      subscriptionId: '5d0f95c8-2430-4337-8077-df9c5a751354',
      channel: 'whatsapp',
      direction: 'IN',
      message: {
        from: 'FROM',
        to: 'TO',
        direction: 'IN',
        channel: 'whatsapp',
        contents: [
          {
            type: 'text',
            text: 'Some message',
          },
          {
            type: 'file',
            fileUrl: 'http://domain.com/some-image.png',
            fileMimeType: 'image/png',
            fileCaption: 'Some image',
          },
          {
            type: 'json',
            payload: {
              visitor: {
                name: 'Some name',
                firstName: 'First name',
                lastName: 'Last name',
                picture: 'http://domain.com/some-image.png',
              },
            },
          },
        ],
      },
    };

    try {
      const response = await rp.post({
        uri: 'http://localhost:3001/events',
        body,
        json: true,
        resolveWithFullResponse: true,
      });

      response.statusCode.should.be.equal(200);
      response.request.uri.path.should.be.equal('/events');
    } catch (error) {
      throw error;
    }

    webhook.close();
  });

  it('should receive message status event', async () => {
    const options = {
      messageStatusEventHandler: (messageStatusEvent: IMessageStatusEvent) => {
        console.log('messageStatusEvent:', messageStatusEvent);
        messageStatusEvent.id.should.be.equal('3fcdb9f9-a44d-4bb2-944c-84cc104e2e9d');
        messageStatusEvent.timestamp.should.be.equal('2019-09-13T22:50:16.585Z');
        messageStatusEvent.type.should.be.equal('MESSAGE_STATUS');
        messageStatusEvent.subscriptionId.should.be.equal('5d0f95c8-2430-4337-8077-df9c5a751354');
        messageStatusEvent.channel.should.be.equal('facebook');
        messageStatusEvent.messageId.should.be.equal('1807f093-c85a-4042-8b09-ee2989a830e6');
        messageStatusEvent.contentIndex.should.be.equal(0);
        messageStatusEvent.messageStatus.timestamp.should.be.equal('2019-09-17T12:31:05-03:00');
        messageStatusEvent.messageStatus.code.should.be.equal('SENT');
        messageStatusEvent.messageStatus.description.should.be.equal('The message has been forwarded to the provider');
      },
    } as IWebhookOptions;
    const webhook = new WebhookController(options);

    webhook.on('error', (error) => {
      throw error;
    });

    webhook.init();

    const body = {
      id: '65690785-99d3-45a4-8d76-3c04529b795c',
      timestamp: '2019-09-17T15:51:45.896Z',
      type: 'MESSAGE',
      subscriptionId: '6a3e7add-258d-4571-b0bd-2bf25c6cd5af',
      channel: 'whatsapp',
      direction: 'IN',
      message: {
        timestamp: '2019-09-17T12:31:05-03:00',
        code: 'SENT',
        description: 'The message has been forwarded to the provider',
      },
    };

    try {
      const response = await rp.post({
        uri: 'http://localhost:3000',
        body,
        json: true,
        resolveWithFullResponse: true,
      });

      response.statusCode.should.be.equal(200);
      response.request.uri.path.should.be.equal('/');
    } catch (error) {
      throw error;
    }

    webhook.close();
  });

  it('should create subscriptions and receive a message event', async () => {
    const client = new Client('SOME_TOKEN');

    const options = {
      messageEventHandler: (messageEvent: IMessageEvent) => {
        messageEvent.id.should.be.equal('3fcdb9f9-a44d-4bb2-944c-84cc104e2e9d');
      },
      messageStatusEventHandler: () => {
      },
      client,
      url: 'http://localhost:3000',
      channel: 'whatsapp',
    } as IWebhookOptions;
    const webhook = new WebhookController(options);

    webhook.on('error', (error) => {
      throw error;
    });

    webhook.init();

    nock('https://api.zenvia.com')
      .log(console.log)
      .get('/v1/subscriptions')
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .times(1)
      .reply(200)
      .post('/v1/subscriptions', {
        eventType: 'MESSAGE',
        webhook: {
          url: 'http://localhost:3000',
        },
        criteria: {
          channel: 'whatsapp',
        },
        status: 'ACTIVE',
      })
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .times(1)
      .reply(200)
      .post('/v1/subscriptions', {
        eventType: 'MESSAGE_STATUS',
        webhook: {
          url: 'http://localhost:3000',
        },
        criteria: {
          channel: 'whatsapp',
        },
        status: 'ACTIVE',
      })
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .times(1)
      .reply(200);

    const body = {
      id: '3fcdb9f9-a44d-4bb2-944c-84cc104e2e9d',
      timestamp: '2019-09-13T22:50:16.585Z',
      type: 'MESSAGE',
      subscriptionId: '5d0f95c8-2430-4337-8077-df9c5a751354',
      channel: 'facebook',
      messageId: '1807f093-c85a-4042-8b09-ee2989a830e6',
      contentIndex: 0,
      messageStatus: {
        from: 'FROM',
        to: 'TO',
        direction: 'IN',
        channel: 'whatsapp',
        contents: [
          {
            type: 'text',
            text: 'Some message',
          },
        ],
      },
    };

    try {
      const response = await rp.post({
        uri: 'http://localhost:3000',
        body,
        json: true,
        resolveWithFullResponse: true,
      });

      response.statusCode.should.be.equal(200);
      response.request.uri.path.should.be.equal('/');
    } catch (error) {
      throw error;
    }

    webhook.close();
  });

  it('should create subscriptions and ignore HTTP conflict error', async () => {
    const client = new Client('SOME_TOKEN');

    const options = {
      messageEventHandler: () => {
      },
      messageStatusEventHandler: () => {
      },
      client,
      url: 'http://localhost:3000',
      channel: 'whatsapp',
      direction: 'IN',
    } as IWebhookOptions;

    const webhook = new WebhookController(options);

    webhook.on('error', (error) => {
      throw error;
    });

    const scope = nock('https://api.zenvia.com')
      .log(console.log)
      .post('/v1/subscriptions', {
        eventType: 'MESSAGE',
        webhook: {
          url: 'http://localhost:3000',
        },
        criteria: {
          channel: 'whatsapp',
          direction: 'IN',
        },
        status: 'ACTIVE',
      })
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .times(1)
      .reply(409)
      .post('/v1/subscriptions', {
        eventType: 'MESSAGE_STATUS',
        webhook: {
          url: 'http://localhost:3000',
        },
        criteria: {
          channel: 'whatsapp',
        },
        status: 'ACTIVE',
      })
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .times(1)
      .reply(409);

    await webhook.init();
    scope.done();
    webhook.close();
  });
});
