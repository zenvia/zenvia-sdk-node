import { AbstractChannel } from './abstract-channel';
import { ContentType, IContent, ILoggerInstance } from '../../types';

/**
 * Implementation of SMS channel.
 */
export class SmsChannel extends AbstractChannel {

  private supportedContents: ContentType[];

  /**
   * Returns a new `SmsChannel` that is used to set the SMS channel.
   *
   * @param token Zenvia platform token.
   * @param loggerInstance If you want, you can pass your log instance.
   */
  constructor(token: string, loggerInstance?: ILoggerInstance) {
    super(token, 'sms', loggerInstance);
    this.supportedContents = ['text'];
  }

  protected contentSupportValidation(content: IContent): void | never {
    if (!this.supportedContents.includes(content.type)) {
      throw new Error(`Content of type ${content.type} is not supported in SMS channel`);
    }
  }

}
