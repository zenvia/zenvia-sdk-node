import { Channel, IChannel, ILoggerInstance, ISubscription, IPartialSubscription, IPartialTemplate } from '../types';
import { Logger } from '../utils/logger';
import { SmsChannel } from './channels/sms';
import { FacebookChannel } from './channels/facebook';
import { WhatsAppChannel } from './channels/whatsapp';
import * as request from '../utils/request';
import { ITemplate, IFlowReport, IMessageReport, MessageType } from '../types/zenvia';

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
  constructor(token: string, loggerInstance?: ILoggerInstance) {
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
      case 'sms': return new SmsChannel(this.token, this.logger);
      case 'facebook': return new FacebookChannel(this.token, this.logger);
      case 'whatsapp': return new WhatsAppChannel(this.token, this.logger);
      default: throw new Error('Unsupported channel');
    }
  }

  /**
   * This method returns a list of flow reports.
   *
   * @returns A promise that resolves to an array of [[IFlowReport]] objects.
   */
  async listFlowReport(startDate: string, endDate?: string, flowId?: string, dispatchId?: string, sessionId?: string): Promise<IFlowReport[]> {
    const properties = [];

    if (flowId) {
      properties.push(`flowId=${flowId}`);
    }
    if (endDate) {
      properties.push(`endDate=${endDate}`);
    }
    if (dispatchId) {
      properties.push(`dispatchId=${dispatchId}`);
    }
    if (sessionId) {
      properties.push(`sessionId=${sessionId}`);
    }

    const path = `/v1/reports/flow/entries?startDate=${startDate}&`;
    return request.get(this.token, path + properties.join('&'), this.logger);
  }

  /**
   * This method returns a list of message reports.
   *
   * @returns A promise that resolves to an array of [[IMessageReport]] objects.
   */
  async listMessageReport(startDate: string, endDate: string, channels?: string, type?: MessageType): Promise<IMessageReport[]> {
    const properties = [];

    if (channels) {
      properties.push(`channels=${channels}`);
    }
    if (type) {
      properties.push(`type=${type}`);
    }

    const path = `/v1/reports/message/entries?startDate=${startDate}&endDate=${endDate}&`;
    return request.get(this.token, path + properties.join('&'), this.logger);
  }

  /**
   * This method returns a list of subscriptions.
   *
   * @returns A promise that resolves to an array of [[ISubscription]] objects.
   */
  async listSubscriptions(): Promise<ISubscription[]> {
    const path = '/v1/subscriptions';
    return request.get(this.token, path, this.logger);
  }

  /**
   * This method creates a subscription.
   *
   * @param subscription An [[ISubscription]] object.
   * @returns A promise that resolves to an [[ISubscription]] object.
   */
  async createSubscription(subscription: ISubscription): Promise<ISubscription> {
    const path = '/v1/subscriptions';
    return request.post(this.token, path, subscription, this.logger);
  }

  /**
   * This method returns a subscription.
   *
   * @param id Subscription identifier.
   * @returns A promise that resolves to an [[ISubscription]] object.
   */
  async getSubscription(id: string): Promise<ISubscription> {
    const path = `/v1/subscriptions/${id}`;
    return request.get(this.token, path, this.logger);
  }

  /**
   * This method updates a subscription.
   *
   * @param id Subscription identifier.
   * @param subscription An [[IPartialSubscription]] object.
   * @returns A promise that resolves to an [[ISubscription]] object.
   */
  async updateSubscription(id: string, subscription: IPartialSubscription): Promise<ISubscription> {
    const path = `/v1/subscriptions/${id}`;
    return request.patch(this.token, path, subscription, this.logger);
  }

  /**
   * This method deletes a subscription.
   *
   * @param id Subscription identifier.
   * @returns A promise that resolves to an [[ISubscription]] object.
   */
  async deleteSubscription(id: string): Promise<void> {
    const path = `/v1/subscriptions/${id}`;
    return request.del(this.token, path, this.logger);
  }

  /**
   * This method returns a list of templates.
   *
   * @returns A promise that resolves to an array of [[ITemplate]] objects.
   */
  async listTemplates(): Promise<ITemplate[]> {
    const path = '/v1/templates';
    return request.get(this.token, path, this.logger)
    .then((templates) => {
      templates.forEach((template) => {
        template.channels.forEach((channel) => {
          (channel.type as any) = channel.type.toLowerCase();
        });
      });
      return templates;
    });
  }

  /**
   * This method returns a template.
   *
   * @param id Template identifier.
   * @returns A promise that resolves to an [[ITemplate]] object.
   */
  async getTemplate(id: string): Promise<ITemplate> {
    const path = `/v1/templates/${id}`;
    return request.get(this.token, path, this.logger)
    .then((template: ITemplate) => {
      template.channels.forEach((channel) => {
        (channel.type as any) = channel.type.toLowerCase();
      });
      return template;
    });
  }

  /**
   * This method creates a template.
   *
   * @param template An [[ITemplate]] object.
   * @returns A promise that resolves to an [[ITemplate]] object.
   */
  async createTemplate(template: ITemplate): Promise<ITemplate> {
    const path = '/v1/templates';
    return request.post(this.token, path, template, this.logger);
  }

  /**
   * This method updates a template.
   *
   * @param id Template identifier.
   * @param template An [[IPartialTemplate]] object.
   * @returns A promise that resolves to an [[ITemplate]] object.
   */
  async updateTemplate(id: string, template: IPartialTemplate): Promise<ITemplate> {
    const path = `/v1/templates/${id}`;
    return request.patch(this.token, path, template, this.logger);
  }

  /**
   * This method deletes a template.
   *
   * @param id Template identifier.
   * @returns A promise that resolves to an [[ITemplate]] object.
   */
  async deleteTemplate(id: string): Promise<void> {
    const path = `/v1/templates/${id}`;
    return request.del(this.token, path, this.logger);
  }

}
