import { AbstractChannel } from './abstract-channel';
import { ContentType, IContent, ILoggerInstance, IClientOptions } from '../../types';

/**
 * Implementation of Telegram channel.
 */
export class TelegramChannel extends AbstractChannel {

  private supportedContents: ContentType[];

  /**
   * Returns a new `TelegramChannel` that is used to set the Telegram channel.
   *
   * @param token Zenvia platform token.
   * @param loggerInstance If you want, you can pass your log instance.
   */
  constructor(token: string, loggerInstance: ILoggerInstance, options: IClientOptions) {
    super(token, 'telegram', loggerInstance, options);
    this.supportedContents = ['text', 'file'];
  }

  protected contentSupportValidation(content: IContent): void | never {
    if (!this.supportedContents.includes(content.type)) {
      throw new Error(`Content of type ${content.type} is not supported in Telegram channel`);
    }
  }

}
