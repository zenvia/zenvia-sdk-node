import { IWebhook, IMessageCriteria, SubscriptionStatus } from '../../types';
import { Subscription } from './base';

export class MessageSubscription extends Subscription {

  constructor(webhook: IWebhook, criteria: IMessageCriteria, status: SubscriptionStatus = 'ACTIVE') {
    super('MESSAGE', webhook, criteria, status);
  }

}
