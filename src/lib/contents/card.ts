import { Buttons, ICardContent, IMedia } from '../../types';
import { AbstractContent } from './abstract-content';

/**
 * Implementation of card content.
 */
export class CardContent extends AbstractContent implements ICardContent {
  title?: string;
  text?: string;
  media?: IMedia;
  buttons?: Buttons;
  quickReplyButtons?: Buttons;

  /**
   * Returns a new `CardContent` that can be used to send an image, a GIF or a video to your customer.
   *
   * @param title A title in bold shown above the text of the card.
   * @param text A text to be displayed inside the card.
   * @param media  Object with the media url, disposition and caption.
   * @param buttons List of buttons displayed inside a card.
   * @param quickReplyButtons Horizontal list of buttons displayed after the content.
   */
  constructor(title?: string, text?: string, media?: IMedia, buttons?: Buttons, quickReplyButtons?: Buttons) {
    super('card');
    this.title = title;
    this.text = text;
    this.media = media;
    this.buttons = buttons;
    this.quickReplyButtons = quickReplyButtons;
  }
}
