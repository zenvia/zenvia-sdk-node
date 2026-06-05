import { IOrderStatusContent, OrderStatusType } from '../../types';
import { AbstractContent } from './abstract-content';

export class OrderStatusContent extends AbstractContent implements IOrderStatusContent {
  body: string;
  footer?: string;
  parameters: {
    referenceId: string;
    order: {
      status: OrderStatusType;
      description?: string;
    };
  };

  constructor(body: string, referenceId: string, status: OrderStatusType, description?: string, footer?: string) {
    super('order_status');
    this.body = body;
    this.parameters = { referenceId, order: { status } };
    if (description) { this.parameters.order.description = description; }
    if (footer) { this.footer = footer; }
  }
}
