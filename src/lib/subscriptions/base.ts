import { ISubscription, EventType, IWebhook, ICriteria, SubscriptionStatus } from '../../types';

export abstract class Subscription implements ISubscription {
  eventType: EventType;
  webhook: IWebhook;
  criteria: ICriteria;
  status: SubscriptionStatus;

  constructor(eventType: EventType, webhook: IWebhook, criteria: ICriteria, status: SubscriptionStatus = 'ACTIVE') {
    this.eventType = eventType;
    this.webhook = webhook;
    this.criteria = criteria;
    this.status = status;
  }

}
