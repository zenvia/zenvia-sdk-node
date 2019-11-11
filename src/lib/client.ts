import { Channel, IChannel, ILoggerInstance, ISubscription, IPartialSubscription } from '../types';
import { Logger } from '../utils/logger';
import { SmsChannel } from './channels/sms';
import { FacebookChannel } from './channels/facebook';
import { WhatsAppChannel } from './channels/whatsapp';
import * as request from '../utils/request';
import { ITemplate } from '../types/zenvia';

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
    return request.get(this.token, path, this.logger);
  }

  /**
   * This method returns a subscription.
   *
   * @param id Subscription identifier.
   * @returns A promise that resolves to an [[ISubscription]] object.
   */
  async getTemplate(id: string): Promise<ITemplate> {
    const path = `/v1/templates/${id}`;
    return request.get(this.token, path, this.logger);
  }
}
