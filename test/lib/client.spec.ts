/* tslint:disable:no-unused-expression */

import * as nock from 'nock';
import { IContent, Channel, Client, TextContent, TemplateContent, FileContent, MessageSubscription, MessageStatusSubscription } from '../../src';

describe('Client', () => {

  describe('Messages', () => {

    describe('SMS Channel', () => {

      it('should send message with text content', async () => {
        const expectedMessage = {
          from: 'FROM',
          to: 'TO',
          contents: [
            {
              type: 'text',
              text: 'some text message',
            },
          ],
        };
        const zenviaNock = nock('https://api.zenvia.com')
        .post('/v1/channels/sms/messages', expectedMessage)
        .matchHeader('X-API-Token', 'SOME_TOKEN')
        .reply(200, expectedMessage);

        const client = new Client('SOME_TOKEN');
        const sms = client.getChannel('sms');
        const content = new TextContent('some text message');
        const actualMessageResponse = await sms.sendMessage('FROM', 'TO', content);
        zenviaNock.isDone().should.be.true;
        actualMessageResponse.should.be.deep.equal(expectedMessage);
      });

      it('should send message with an array of text content', async () => {
        const expectedMessage = {
          from: 'FROM',
          to: 'TO',
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
        };
        const zenviaNock = nock('https://api.zenvia.com')
        .post('/v1/channels/sms/messages', expectedMessage)
        .matchHeader('X-API-Token', 'SOME_TOKEN')
        .reply(200, expectedMessage);

        const client = new Client('SOME_TOKEN');
        const sms = client.getChannel('sms');
        const contents = [new TextContent('first text message'), new TextContent('second text message')];
        const actualMessageResponse = await sms.sendMessage('FROM', 'TO', ...contents);
        zenviaNock.isDone().should.be.true;
        actualMessageResponse.should.be.deep.equal(expectedMessage);
      });

      it('should fail when trying to send template content', async () => {
        const client = new Client('SOME_TOKEN');
        const sms = client.getChannel('sms');
        const content = new TemplateContent('templateId', {});

        try {
          await sms.sendMessage('FROM', 'TO', content);
          throw new Error('An expected error was not throwed');
        } catch (error) {
          error.message.should.be.deep.equal('Content of type template is not supported in SMS channel');
        }
      });

      it('should fail when trying to send file content', async () => {
        const client = new Client('SOME_TOKEN');
        const sms = client.getChannel('sms');
        const content = new FileContent('fileUrl', 'fileMimeType', 'fileCaption');

        try {
          await sms.sendMessage('FROM', 'TO', content);
          throw new Error('An expected error was not throwed');
        } catch (error) {
          error.message.should.be.deep.equal('Content of type file is not supported in SMS channel');
        }
      });

    });

    describe('Facebook Channel', () => {

      it('should send message with text content', async () => {
        const expectedMessage = {
          from: 'FROM',
          to: 'TO',
          contents: [
            {
              type: 'text',
              text: 'some text message',
            },
          ],
        };
        const zenviaNock = nock('https://api.zenvia.com')
        .post('/v1/channels/facebook/messages', expectedMessage)
        .matchHeader('X-API-Token', 'SOME_TOKEN')
        .reply(200, expectedMessage);

        const client = new Client('SOME_TOKEN');
        const facebook = client.getChannel('facebook');
        const content = new TextContent('some text message');
        const actualMessageResponse = await facebook.sendMessage('FROM', 'TO', content);
        zenviaNock.isDone().should.be.true;
        actualMessageResponse.should.be.deep.equal(expectedMessage);
      });

      it('should send message with file content', async () => {
        const expectedMessage = {
          from: 'FROM',
          to: 'TO',
          contents: [
            {
              type: 'file',
              fileUrl: 'http://server.com/file.jpeg',
              fileMimeType: 'image/jpeg',
              fileCaption: 'some file caption',
            },
          ],
        };
        const zenviaNock = nock('https://api.zenvia.com')
        .post('/v1/channels/facebook/messages', expectedMessage)
        .matchHeader('X-API-Token', 'SOME_TOKEN')
        .reply(200, expectedMessage);

        const client = new Client('SOME_TOKEN');
        const facebook = client.getChannel('facebook');
        const content = new FileContent('http://server.com/file.jpeg', 'image/jpeg', 'some file caption');
        const actualMessageResponse = await facebook.sendMessage('FROM', 'TO', content);
        zenviaNock.isDone().should.be.true;
        actualMessageResponse.should.be.deep.equal(expectedMessage);
      });

      it('should fail when trying to send template content', async () => {
        const client = new Client('SOME_TOKEN');
        const facebook = client.getChannel('facebook');
        const content = new TemplateContent('templateId', {});

        try {
          await facebook.sendMessage('FROM', 'TO', content);
          throw new Error('An expected error was not throwed');
        } catch (error) {
          error.message.should.be.deep.equal('Content of type template is not supported in Facebook channel');
        }
      });

      it('should fail when trying to send array with template content', async () => {
        const client = new Client('SOME_TOKEN');
        const facebook = client.getChannel('facebook');
        const textContent = new TextContent('some text message');
        const templateContent = new TemplateContent('templateId', {});

        try {
          await facebook.sendMessage('FROM', 'TO', textContent, templateContent);
          throw new Error('An expected error was not throwed');
        } catch (error) {
          error.message.should.be.deep.equal('Content of type template is not supported in Facebook channel');
        }
      });

    });

    describe('WhatsApp Channel', () => {

      it('should send message with text content', async () => {
        const expectedMessage = {
          from: 'FROM',
          to: 'TO',
          contents: [
            {
              type: 'text',
              text: 'some text message',
            },
          ],
        };
        const zenviaNock = nock('https://api.zenvia.com')
        .post('/v1/channels/whatsapp/messages', expectedMessage)
        .matchHeader('X-API-Token', 'SOME_TOKEN')
        .reply(200, expectedMessage);

        const client = new Client('SOME_TOKEN');
        const whatsapp = client.getChannel('whatsapp');
        const content = new TextContent('some text message');
        const actualMessageResponse = await whatsapp.sendMessage('FROM', 'TO', content);
        zenviaNock.isDone().should.be.true;
        actualMessageResponse.should.be.deep.equal(expectedMessage);
      });

      it('should send message with file content', async () => {
        const expectedMessage = {
          from: 'FROM',
          to: 'TO',
          contents: [
            {
              type: 'file',
              fileUrl: 'http://server.com/file.jpeg',
              fileMimeType: 'image/jpeg',
              fileCaption: 'some file caption',
            },
          ],
        };
        const zenviaNock = nock('https://api.zenvia.com')
        .post('/v1/channels/whatsapp/messages', expectedMessage)
        .matchHeader('X-API-Token', 'SOME_TOKEN')
        .reply(200, expectedMessage);

        const client = new Client('SOME_TOKEN');
        const whatsapp = client.getChannel('whatsapp');
        const content = new FileContent('http://server.com/file.jpeg', 'image/jpeg', 'some file caption');
        const actualMessageResponse = await whatsapp.sendMessage('FROM', 'TO', content);
        zenviaNock.isDone().should.be.true;
        actualMessageResponse.should.be.deep.equal(expectedMessage);
      });

      it('should send message with array of text content and file content', async () => {
        const expectedMessage = {
          from: 'FROM',
          to: 'TO',
          contents: [
            {
              type: 'text',
              text: 'some text message',
            },
            {
              type: 'file',
              fileUrl: 'http://server.com/file.jpeg',
              fileMimeType: 'image/jpeg',
              fileCaption: 'some file caption',
            },
          ],
        };
        const zenviaNock = nock('https://api.zenvia.com')
        .post('/v1/channels/whatsapp/messages', expectedMessage)
        .matchHeader('X-API-Token', 'SOME_TOKEN')
        .reply(200, expectedMessage);

        const client = new Client('SOME_TOKEN');
        const whatsapp = client.getChannel('whatsapp');
        const textContent = new TextContent('some text message');
        const fileContent = new FileContent('http://server.com/file.jpeg', 'image/jpeg', 'some file caption');
        const actualMessageResponse = await whatsapp.sendMessage('FROM', 'TO', textContent, fileContent);
        zenviaNock.isDone().should.be.true;
        actualMessageResponse.should.be.deep.equal(expectedMessage);
      });

      it('should send message with template content', async () => {
        const expectedMessage = {
          from: 'FROM',
          to: 'TO',
          contents: [
            {
              type: 'template',
              templateId: 'templateId',
              fields: {
                fieldA: 'value A',
                fieldB: 'value B',
              },
            },
          ],
        };
        const zenviaNock = nock('https://api.zenvia.com')
        .post('/v1/channels/whatsapp/messages', expectedMessage)
        .matchHeader('X-API-Token', 'SOME_TOKEN')
        .reply(200, expectedMessage);

        const client = new Client('SOME_TOKEN');
        const whatsapp = client.getChannel('whatsapp');
        const content = new TemplateContent('templateId', { fieldA: 'value A', fieldB: 'value B' });
        const actualMessageResponse = await whatsapp.sendMessage('FROM', 'TO', content);
        zenviaNock.isDone().should.be.true;
        actualMessageResponse.should.be.deep.equal(expectedMessage);
      });

      it('should fail when trying to send invalid content', async () => {
        const client = new Client('SOME_TOKEN');
        const whatsapp = client.getChannel('whatsapp');

        try {
          await whatsapp.sendMessage('FROM', 'TO', {} as IContent);
          throw new Error('An expected error was not throwed');
        } catch (error) {
          error.message.should.be.deep.equal('Content of type undefined is not supported in WhatsApp channel');
        }
      });

    });

  });

  describe('Subscription', () => {

    it('should list subscriptions', async () => {
      const expectedSubscription = [{
        eventType: 'MESSAGE',
        webhook: {
          url: 'https://my-webhook.com',
        },
        criteria: {
          channel: 'whatsapp',
        },
        status: 'ACTIVE',
      }];
      const zenviaNock = nock('https://api.zenvia.com')
      .get('/v1/subscriptions')
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .reply(200, expectedSubscription);

      const client = new Client('SOME_TOKEN');
      const actualMessageResponse = await client.listSubscriptions();
      zenviaNock.isDone().should.be.true;
      actualMessageResponse.should.be.deep.equal(expectedSubscription);
    });

    it('should create subscription for MESSAGE eventType', async () => {
      const expectedSubscription = {
        eventType: 'MESSAGE',
        webhook: {
          url: 'https://my-webhook.com',
        },
        criteria: {
          channel: 'whatsapp',
        },
        status: 'ACTIVE',
      };
      const zenviaNock = nock('https://api.zenvia.com')
      .post('/v1/subscriptions', expectedSubscription)
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .reply(200, expectedSubscription);

      const client = new Client('SOME_TOKEN');
      const subscription = new MessageSubscription({ url: 'https://my-webhook.com' }, { channel: 'whatsapp' });
      const actualMessageResponse = await client.createSubscription(subscription);
      zenviaNock.isDone().should.be.true;
      actualMessageResponse.should.be.deep.equal(expectedSubscription);
    });

    it('should create subscription for MESSAGE eventType with message direction', async () => {
      const expectedSubscription = {
        eventType: 'MESSAGE',
        webhook: {
          url: 'https://my-webhook.com',
        },
        criteria: {
          channel: 'whatsapp',
          direction: 'IN',
        },
        status: 'ACTIVE',
      };
      const zenviaNock = nock('https://api.zenvia.com')
      .post('/v1/subscriptions', expectedSubscription)
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .reply(200, expectedSubscription);

      const client = new Client('SOME_TOKEN');
      const subscription = new MessageSubscription({ url: 'https://my-webhook.com' }, { channel: 'whatsapp', direction: 'IN' });
      const actualMessageResponse = await client.createSubscription(subscription);
      zenviaNock.isDone().should.be.true;
      actualMessageResponse.should.be.deep.equal(expectedSubscription);
    });

    it('should create subscription for MESSAGE_STATUS eventType', async () => {
      const expectedSubscription = {
        eventType: 'MESSAGE_STATUS',
        webhook: {
          url: 'https://my-webhook.com',
        },
        criteria: {
          channel: 'whatsapp',
        },
        status: 'ACTIVE',
      };
      const zenviaNock = nock('https://api.zenvia.com')
      .post('/v1/subscriptions', expectedSubscription)
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .reply(200, expectedSubscription);

      const client = new Client('SOME_TOKEN');
      const subscription = new MessageStatusSubscription({ url: 'https://my-webhook.com' }, { channel: 'whatsapp' });
      const actualMessageResponse = await client.createSubscription(subscription);
      zenviaNock.isDone().should.be.true;
      actualMessageResponse.should.be.deep.equal(expectedSubscription);
    });

    it('should create subscription setting status as INACTIVE', async () => {
      const expectedSubscription = {
        eventType: 'MESSAGE',
        webhook: {
          url: 'https://my-webhook.com',
        },
        criteria: {
          channel: 'whatsapp',
        },
        status: 'INACTIVE',
      };
      const zenviaNock = nock('https://api.zenvia.com')
      .post('/v1/subscriptions', expectedSubscription)
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .reply(200, expectedSubscription);

      const client = new Client('SOME_TOKEN');
      const subscription = new MessageSubscription({ url: 'https://my-webhook.com' }, { channel: 'whatsapp' }, 'INACTIVE');
      const actualMessageResponse = await client.createSubscription(subscription);
      zenviaNock.isDone().should.be.true;
      actualMessageResponse.should.be.deep.equal(expectedSubscription);
    });

    it('should get subscription with id', async () => {
      const expectedSubscription = {
        eventType: 'MESSAGE',
        webhook: {
          url: 'https://my-webhook.com',
        },
        criteria: {
          channel: 'whatsapp',
        },
        status: 'INACTIVE',
      };
      const zenviaNock = nock('https://api.zenvia.com')
      .get('/v1/subscriptions/SOME_SUBSCRIPTION_ID')
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .reply(200, expectedSubscription);

      const client = new Client('SOME_TOKEN');
      const actualMessageResponse = await client.getSubscription('SOME_SUBSCRIPTION_ID');
      zenviaNock.isDone().should.be.true;
      actualMessageResponse.should.be.deep.equal(expectedSubscription);
    });

    it('should update subscription', async () => {
      const expectedSubscription = {
        eventType: 'MESSAGE',
        webhook: {
          url: 'https://my-webhook.com',
        },
        criteria: {
          channel: 'whatsapp',
        },
        status: 'INACTIVE',
      };
      const zenviaNock = nock('https://api.zenvia.com')
      .patch('/v1/subscriptions/SOME_SUBSCRIPTION_ID', { status: 'INACTIVE' })
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .reply(200, expectedSubscription);

      const client = new Client('SOME_TOKEN');
      const actualMessageResponse = await client.updateSubscription('SOME_SUBSCRIPTION_ID', { status: 'INACTIVE' });
      zenviaNock.isDone().should.be.true;
      actualMessageResponse.should.be.deep.equal(expectedSubscription);
    });

    it('should delete subscription', async () => {
      const zenviaNock = nock('https://api.zenvia.com')
      .delete('/v1/subscriptions/SOME_SUBSCRIPTION_ID')
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .reply(204);

      const client = new Client('SOME_TOKEN');
      await client.deleteSubscription('SOME_SUBSCRIPTION_ID');
      zenviaNock.isDone().should.be.true;
    });

  });

  describe('Errors', () => {

    it('should throw unsupported channel error', () => {
      const client = new Client('SOME_TOKEN');

      try {
        client.getChannel('invalid' as Channel);
        throw new Error('An expected error was not throwed');
      } catch (error) {
        error.message.should.be.equal('Unsupported channel');
      }
    });

    it('should handle request http error', async () => {
      const errorResponse = {
        code: 'AUTHENTICATION_ERROR',
        message: 'Please make sure if a valid JWT token was sent',
      };

      const zenviaNock = nock('https://api.zenvia.com')
      .get('/v1/subscriptions')
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .reply(400, errorResponse);

      const client = new Client('SOME_TOKEN');
      try {
        await client.listSubscriptions();
        throw new Error('An expected error was not throwed');
      } catch (error) {
        error.should.be.deep.equal({ httpStatusCode: 400, message: 'Unsuccessful request', body: errorResponse });
      }
      zenviaNock.isDone().should.be.true;
    });

    it('should handle technical error', async () => {
      const zenviaNock = nock('https://api.zenvia.com')
      .get('/v1/subscriptions')
      .matchHeader('X-API-Token', 'SOME_TOKEN')
      .replyWithError('getaddrinfo ENOTFOUND api.zenvia.com');

      const client = new Client('SOME_TOKEN');
      try {
        await client.listSubscriptions();
        throw new Error('An expected error was not throwed');
      } catch (error) {
        error.message.should.be.equal('Error: getaddrinfo ENOTFOUND api.zenvia.com');
        error.causedBy.should.not.be.null;
      }
      zenviaNock.isDone().should.be.true;
    });

  });

});
