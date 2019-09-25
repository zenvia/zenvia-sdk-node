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
   * @param eventType Event type. An [[EventType]] object.
   * @param webhook An [[IWebhook]] object.
   * @param criteria An [[ICriteria]] object.
   * @param status Status of subscription. An [[SubscriptionStatus]] object.
   */
  constructor(eventType: EventType, webhook: IWebhook, criteria: ICriteria, status: SubscriptionStatus = 'ACTIVE') {
    this.eventType = eventType;
    this.webhook = webhook;
    this.criteria = criteria;
    this.status = status;
  }

}
