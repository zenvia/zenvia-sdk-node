import { AbstractContent } from './abstract-content';
import { ITextContent } from '../../types';

/**
 * Implementation of text content.
 */
export class TextContent extends AbstractContent implements ITextContent {

  text: string;
  payload: string;

  /**
   * Returns a new `TextContent` that can be used to send text messages to your customer.
   *
   * @param text The text of the message.
   */
  constructor(text: string, payload?: string) {
    super('text');
    this.text = text;
    this.payload = payload;
  }

}
