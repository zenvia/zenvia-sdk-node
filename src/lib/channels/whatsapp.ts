import { AbstractChannel } from './abstract-channel';
import { ContentType, IContent, ILoggerInstance, IClientOptions } from '../../types';

/**
 * Implementation of WhatsApp channel.
 */
export class WhatsAppChannel extends AbstractChannel {

  private supportedContents: ContentType[];

  /**
   * Returns a new `WhatsAppChannel` that is used to set the WhatsApp channel.
   *
   * @param token Zenvia platform token.
   * @param loggerInstance If you want, you can pass your log instance.
   */
  constructor(token: string, loggerInstance: ILoggerInstance, options: IClientOptions) {
    super(token, 'whatsapp', loggerInstance, options);
    this.supportedContents = ['text', 'file', 'template', 'contacts', 'location'];
  }

  protected contentSupportValidation(content: IContent): void | never {
    if (!this.supportedContents.includes(content.type)) {
      throw new Error(`Content of type ${content.type} is not supported in WhatsApp channel`);
    }
  }

}
