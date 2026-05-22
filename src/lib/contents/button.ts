import { IButtonContent, IFile } from '../../types';
import { AbstractContent } from './abstract-content';

export class ButtonContent extends AbstractContent implements IButtonContent {
  header?: IFile | string;
  body: string;
  footer?: string;
  buttons: { id: string; title: string; }[];

  constructor(body: string, buttons: { id: string; title: string; }[], header?: IFile | string, footer?: string) {
    super('button');
    this.body = body;
    this.buttons = buttons;
    this.header = header;
    this.footer = footer;
  }
}
