import { IWebhook, ICriteria, SubscriptionStatus } from '../../types';
import { Subscription } from './base';

/**
 * Implementation of message status subscription.
 */
export class MessageStatusSubscription extends Subscription {

  /**
   * Returns a new `MessageStatusSubscription` that is used to create a new message status subscription.
   *
   * @param webhook An [[IWebhook]] object.
   * @param criteria An [[ICriteria]] object.
   * @param status Status of subscription. An [[SubscriptionStatus]] object.
   */
  constructor(webhook: IWebhook, criteria: ICriteria, status: SubscriptionStatus = 'ACTIVE') {
    super('MESSAGE_STATUS', webhook, criteria, status);
  }

}
