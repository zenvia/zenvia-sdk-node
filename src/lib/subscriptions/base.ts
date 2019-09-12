import { ISubscription, EventType, IWebhook, ICriteria, SubscriptionStatus } from '../../types';

/**
 * Implementation of base subscription.
 */
export abstract class Subscription implements ISubscription {

  eventType: EventType;
  webhook: IWebhook;
  criteria: ICriteria;
  status: SubscriptionStatus;

  /**
   * Returns a new `Subscription` that is used to create a new subscription.
   *
   * @param eventType Event type. The [[EventType]] object.
   * @param webhook The [[IWebhook]] object.
   * @param criteria The [[ICriteria]] object.
   * @param status Status of subscription. The [[SubscriptionStatus]] object.
   */
  constructor(eventType: EventType, webhook: IWebhook, criteria: ICriteria, status: SubscriptionStatus = 'ACTIVE') {
    this.eventType = eventType;
    this.webhook = webhook;
    this.criteria = criteria;
    this.status = status;
  }

}
