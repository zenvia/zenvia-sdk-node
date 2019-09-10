import { IWebhook, ICriteria, SubscriptionStatus } from '../../types';
import { Subscription } from './base';

/**
 * Implementation of message status subscription.
 */
export class MessageStatusSubscription extends Subscription {

  /**
   * Returns a new `MessageStatusSubscription` that is used to create a new message status subscription.
   *
   * @param webhook The [[IWebhook]] object.
   * @param criteria The [[ICriteria]] object.
   * @param status Status of subscription. The [[SubscriptionStatus]] object.
   */
  constructor(webhook: IWebhook, criteria: ICriteria, status: SubscriptionStatus = 'ACTIVE') {
    super('MESSAGE_STATUS', webhook, criteria, status);
  }

}
