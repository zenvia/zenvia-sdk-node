import { AbstractContent } from './abstract-content';
import { IEmailContent, IFile } from '../../types';

/**
 * Implementation of email content.
 */
export class EmailContent extends AbstractContent implements IEmailContent {

  subject: string;
  html?: string;
  text?: string;
  attachments?: IFile[];
  cc?: string[];
  bcc?: string[];

  /**
   * Returns a new `EmailContent` that can be used to send audio, image, video, or document media to your customer.
   *
   * @param subject The subject of the e-mail to be sent.
   * @param html The content to be sent in HTML format.
   * @param text The content to be sent in plain text format.
   * @param attachments Files to be attached in the e-mail.
   */
  constructor(subject: string, attachments?: IFile[], html?: string, text?: string) {
    super('email');
    this.subject = subject;
    this.html = html;
    this.text = text;
    this.attachments = attachments;
  }

}
