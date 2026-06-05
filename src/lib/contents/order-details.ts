import { IOrderDetailsContent, PaymentSettings, IOrderItem, IOrderTax, IOrderShipping, IOrderDiscount, IOrderExpiration } from '../../types';
import { AbstractContent } from './abstract-content';

export class OrderDetailsContent extends AbstractContent implements IOrderDetailsContent {
  body: string;
  footer?: string;
  parameters: {
    referenceId?: string;
    type?: 'digital_goods' | 'physical_goods';
    paymentSettings: PaymentSettings[];
    totalAmount: number;
    order: {
      catalogId?: string;
      expiration?: IOrderExpiration;
      items: IOrderItem[];
      subtotal: number;
      tax: IOrderTax;
      shipping?: IOrderShipping;
      discount?: IOrderDiscount;
    };
  };

  constructor(body: string, paymentSettings: PaymentSettings[], totalAmount: number, order: { items: IOrderItem[]; subtotal: number; tax: IOrderTax; catalogId?: string; expiration?: IOrderExpiration; shipping?: IOrderShipping; discount?: IOrderDiscount; }, referenceId?: string, type?: 'digital_goods' | 'physical_goods', footer?: string) {
    super('order_details');
    this.body = body;
    this.parameters = { paymentSettings, totalAmount, order };
    if (referenceId) { this.parameters.referenceId = referenceId; }
    if (type) { this.parameters.type = type; }
    if (footer) { this.footer = footer; }
  }
}
