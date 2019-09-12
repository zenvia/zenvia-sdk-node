import { IWebhook, IMessageCriteria, SubscriptionStatus } from '../../types';
import { Subscription } from './base';

/**
 * Implementation of message subscription.
 */
export class MessageSubscription extends Subscription {

  /**
   * Returns a new `MessageSubscription` that is used to create a new message subscription.
   *
   * @param webhook The [[IWebhook]] object.
   * @param criteria The [[ICriteria]] object.
   * @param status Status of subscription. The [[SubscriptionStatus]] object.
   */
  constructor(webhook: IWebhook, criteria: IMessageCriteria, status: SubscriptionStatus = 'ACTIVE') {
    super('MESSAGE', webhook, criteria, status);
  }

}
