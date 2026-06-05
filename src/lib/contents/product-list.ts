import { IProductListContent } from '../../types';
import { AbstractContent } from './abstract-content';

export class ProductListContent extends AbstractContent implements IProductListContent {
  header?: string;
  body: string;
  footer?: string;
  catalogId: string;
  sections: { title: string; productItems: { productId: string; }[]; }[];

  constructor(body: string, catalogId: string, sections: { title: string; productItems: { productId: string; }[]; }[], header?: string, footer?: string) {
    super('product_list');
    this.body = body;
    this.catalogId = catalogId;
    this.sections = sections;
    this.header = header;
    this.footer = footer;
  }
}
