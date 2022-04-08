import { Channel, IChannel, IMessageBatch, ILoggerInstance, ISubscription, IPartialSubscription, IPartialTemplate, IClientOptions } from '../types';
import { Logger } from '../utils/logger';
import { SmsChannel } from './channels/sms';
import { RcsChannel } from './channels/rcs';
import { InstagramChannel } from './channels/instagram';
import { FacebookChannel } from './channels/facebook';
import { WhatsAppChannel } from './channels/whatsapp';
import { TelegramChannel } from './channels/telegram';
import { GbmChannel } from './channels/gbm';
import { EmailChannel } from './channels/email';
import * as request from '../utils/request';
import { ITemplate, MessageBatch } from '../types/zenvia';
import { ReportFlow } from './reports/report-flow';
import { ReportMessages } from './reports/report-messages';
import { Readable } from 'stream';
import * as fs from 'fs';

/**
 * Client class with the features.
 */
export class Client {

  private token: string;
  protected logger: Logger;

  /**
   * Returns a new `Client` that can be used to execute some functionality.
   *
   * @param token Zenvia platform token.
   * @param loggerInstance If you want, you can pass your log instance.
   */
  constructor(token: string, loggerInstance?: ILoggerInstance, private options?: IClientOptions) {
    this.token = token;
    this.logger = new Logger(loggerInstance);
  }

  /**
   * This method returns a channel type object.
   *
   * @param channel [[Channel]] of the instance that you want to create.
   * @returns [[Channel]] type instance.
   */
  getChannel(channel: Channel): IChannel {
    switch (channel) {
      case 'sms': return new SmsChannel(this.token, this.logger, this.options);
      case 'rcs': return new RcsChannel(this.token, this.logger, this.options);
      case 'facebook': return new FacebookChannel(this.token, this.logger, this.options);
      case 'whatsapp': return new WhatsAppChannel(this.token, this.logger, this.options);
      case 'instagram': return new InstagramChannel(this.token, this.logger, this.options);
      case 'telegram': return new TelegramChannel(this.token, this.logger, this.options);
      case 'gbm': return new GbmChannel(this.token, this.logger, this.options);
      case 'email': return new EmailChannel(this.token, this.logger, this.options);
      default: throw new Error('Unsupported channel');
    }
  }

  /**
   * This method creates a message batch.
   *
   * @param contacts A [[Readable]] object.
   * @param batch Either an [[ISmsMessageBatch]] object or a [[IWhatsAppMessageBatch]] object.
   * @returns A promise that resolves an [[IMessageBatch]] object
   */
  sendMessageBatch(contacts: Readable | string, batch: MessageBatch): Promise<IMessageBatch> {
    const formData = {
      batch: {
        value: JSON.stringify(batch),
        options: {
          contentType: 'application/json',
        },
      },
      contacts: {
        value: typeof contacts === 'string' ? fs.createReadStream(contacts) : contacts,
        options: {
          filename: typeof contacts === 'string' ? contacts : 'contacts.csv',
          contentType: 'text/csv',
        },
      },
    };

    const path = '/v2/message-batches';
    return request.post(this.token, path, undefined, this.logger, { ...this.options, formData });
  }

  /**
   * This method returns a list of flow reports.
   *
   * @returns [[ReportFlow]] type instance.
   */
  getFlowReportClient(): ReportFlow {
    return new ReportFlow(this.token, this.logger, this.options);
  }

  /**
   * This method returns a list of message reports.
   *
   * @returns [[ReportMessages]] type instance.
   */
  getMessagesReportClient(): ReportMessages  {
    return new ReportMessages(this.token, this.logger, this.options);
  }

  /**
   * This method returns a list of subscriptions.
   *
   * @returns A promise that resolves to an array of [[ISubscription]] objects.
   */
  async listSubscriptions(): Promise<ISubscription[]> {
    const path = '/v2/subscriptions';
    return request.get(this.token, path, this.logger, this.options);
  }

  /**
   * This method creates a subscription.
   *
   * @param subscription An [[ISubscription]] object.
   * @returns A promise that resolves to an [[ISubscription]] object.
   */
  async createSubscription(subscription: ISubscription): Promise<ISubscription> {
    const path = '/v2/subscriptions';
    return request.post(this.token, path, subscription, this.logger, this.options);
  }

  /**
   * This method returns a subscription.
   *
   * @param id Subscription identifier.
   * @returns A promise that resolves to an [[ISubscription]] object.
   */
  async getSubscription(id: string): Promise<ISubscription> {
    const path = `/v2/subscriptions/${id}`;
    return request.get(this.token, path, this.logger, this.options);
  }

  /**
   * This method updates a subscription.
   *
   * @param id Subscription identifier.
   * @param subscription An [[IPartialSubscription]] object.
   * @returns A promise that resolves to an [[ISubscription]] object.
   */
  async updateSubscription(id: string, subscription: IPartialSubscription): Promise<ISubscription> {
    const path = `/v2/subscriptions/${id}`;
    return request.patch(this.token, path, subscription, this.logger, this.options);
  }

  /**
   * This method deletes a subscription.
   *
   * @param id Subscription identifier.
   * @returns A promise that resolves to an [[ISubscription]] object.
   */
  async deleteSubscription(id: string): Promise<void> {
    const path = `/v2/subscriptions/${id}`;
    return request.del(this.token, path, this.logger, this.options);
  }

  /**
   * This method returns a list of templates.
   *
   * @returns A promise that resolves to an array of [[ITemplate]] objects.
   */
  async listTemplates(): Promise<ITemplate[]> {
    const path = '/v2/templates';
    return request.get(this.token, path, this.logger, this.options);
  }

  /**
   * This method returns a template.
   *
   * @param id Template identifier.
   * @returns A promise that resolves to an [[ITemplate]] object.
   */
  async getTemplate(id: string): Promise<ITemplate> {
    const path = `/v2/templates/${id}`;
    return request.get(this.token, path, this.logger, this.options);
  }

  /**
   * This method creates a template.
   *
   * @param template An [[ITemplate]] object.
   * @returns A promise that resolves to an [[ITemplate]] object.
   */
  async createTemplate(template: ITemplate): Promise<ITemplate> {
    const path = '/v2/templates';
    return request.post(this.token, path, template, this.logger, this.options);
  }

  /**
   * This method updates a template.
   *
   * @param id Template identifier.
   * @param template An [[IPartialTemplate]] object.
   * @returns A promise that resolves to an [[ITemplate]] object.
   */
  async updateTemplate(id: string, template: IPartialTemplate): Promise<ITemplate> {
    const path = `/v2/templates/${id}`;
    return request.patch(this.token, path, template, this.logger, this.options);
  }

  /**
   * This method deletes a template.
   *
   * @param id Template identifier.
   * @returns A promise that resolves to an [[ITemplate]] object.
   */
  async deleteTemplate(id: string): Promise<void> {
    const path = `/v2/templates/${id}`;
    return request.del(this.token, path, this.logger, this.options);
  }

}
