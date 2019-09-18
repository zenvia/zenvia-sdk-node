import { IWebhook, IMessageCriteria, SubscriptionStatus } from '../../types';
import { Subscription } from './base';

/**
 * Implementation of message subscription.
 */
export class MessageSubscription extends Subscription {

  /**
   * Returns a new `MessageSubscription` that is used to create a new message subscription.
   *
   * @param webhook An [[IWebhook]] object.
   * @param criteria An [[ICriteria]] object.
   * @param status Status of subscription. An [[SubscriptionStatus]] object.
   */
  constructor(webhook: IWebhook, criteria: IMessageCriteria, status: SubscriptionStatus = 'ACTIVE') {
    super('MESSAGE', webhook, criteria, status);
  }

}
