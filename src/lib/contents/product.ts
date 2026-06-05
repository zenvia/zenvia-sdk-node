import { IProductContent } from '../../types';
import { AbstractContent } from './abstract-content';

export class ProductContent extends AbstractContent implements IProductContent {
  body: string;
  footer?: string;
  catalogId: string;
  productId: string;

  constructor(body: string, catalogId: string, productId: string, footer?: string) {
    super('product');
    this.body = body;
    this.catalogId = catalogId;
    this.productId = productId;
    this.footer = footer;
  }
}
