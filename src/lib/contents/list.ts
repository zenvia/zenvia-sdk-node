import { IListContent } from '../../types';
import { AbstractContent } from './abstract-content';

export class ListContent extends AbstractContent implements IListContent {
  header?: string;
  body: string;
  footer?: string;
  button: string;
  sections: { title: string; rows: { id: string; title: string; description?: string; }[]; }[];

  constructor(body: string, button: string, sections: { title: string; rows: { id: string; title: string; description?: string; }[]; }[], header?: string, footer?: string) {
    super('list');
    this.body = body;
    this.button = button;
    this.sections = sections;
    this.header = header;
    this.footer = footer;
  }
}
