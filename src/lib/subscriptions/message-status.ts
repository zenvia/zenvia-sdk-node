import { IWebhook, ICriteria, SubscriptionStatus } from '../../types';
import { Subscription } from './base';

export class MessageStatusSubscription extends Subscription {

  constructor(webhook: IWebhook, criteria: ICriteria, status: SubscriptionStatus = 'ACTIVE') {
    super('MESSAGE_STATUS', webhook, criteria, status);
  }

}
