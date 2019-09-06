import { AbstractContent } from './abstract-content';
import { ITextContent } from '../../types';

export class TextContent extends AbstractContent implements ITextContent {

  text: string;

  constructor(text: string) {
    super('text');
    this.text = text;
  }

}
