import { Buttons, IReplyableText } from '../../types';
import { AbstractContent } from './abstract-content';

/**
 * Implementation of Replyable Text content.
 */
export class ReplyableTextContent extends AbstractContent implements IReplyableText {
  text: string;
  quickReplyButtons?: Buttons;

  /**
   * Returns a new `ReplyableTextContent` that can be used to send text and reply buttons to your customer.
   *
   * @param text Text to be sent.
   * @param quickReployButtons Horizontal list of buttons displayed after the content.
   */
  constructor(text: string, quickReplyButtons?: Buttons) {
    super('replyable_text');
    this.text = text;
    this.quickReplyButtons = quickReplyButtons;
  }

}
