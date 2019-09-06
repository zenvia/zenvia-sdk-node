import { Channel, IChannel, ILoggerInstance, ISubscription, IPartialSubscription } from '../types';
import { Logger } from '../utils/logger';
import { SmsChannel } from './channels/sms';
import { FacebookChannel } from './channels/facebook';
import { WhatsAppChannel } from './channels/whatsapp';
import * as request from '../utils/request';

export class Client {

  private token: string;
  protected logger: Logger;

  constructor(token: string, loggerInstance?: ILoggerInstance) {
    this.token = token;
    this.logger = new Logger(loggerInstance);
  }

  getChannel(channel: Channel): IChannel {
    switch (channel) {
      case 'sms': return new SmsChannel(this.token, this.logger);
      case 'facebook': return new FacebookChannel(this.token, this.logger);
      case 'whatsapp': return new WhatsAppChannel(this.token, this.logger);
      default: throw new Error('Unsupported channel');
    }
  }

  async listSubscriptions(): Promise<ISubscription[]> {
    const path = '/v1/subscriptions';
    return request.get(this.token, path, this.logger);
  }

  async createSubscription(subscription: ISubscription): Promise<ISubscription> {
    const path = '/v1/subscriptions';
    return request.post(this.token, path, subscription, this.logger);
  }

  async getSubscription(id: string): Promise<ISubscription> {
    const path = `/v1/subscriptions/${id}`;
    return request.get(this.token, path, this.logger);
  }

  async updateSubscription(id: string, subscription: IPartialSubscription): Promise<ISubscription> {
    const path = `/v1/subscriptions/${id}`;
    return request.patch(this.token, path, subscription, this.logger);
  }

  async deleteSubscription(id: string): Promise<void> {
    const path = `/v1/subscriptions/${id}`;
    return request.del(this.token, path, this.logger);
  }

}
