import { AbstractChannel } from './abstract-channel';
import { ContentType, IContent, ILoggerInstance, IClientOptions } from '../../types';

/**
 * Implementation of Email channel.
 */
export class EmailChannel extends AbstractChannel {

  private supportedContents: ContentType[];

  /**
   * Returns a new `EmailChannel` that is used to set the Email channel.
   *
   * @param token Zenvia platform token.
   * @param loggerInstance If you want, you can pass your log instance.
   */
  constructor(token: string, loggerInstance: ILoggerInstance, options: IClientOptions) {
    super(token, 'email', loggerInstance, options);
    this.supportedContents = ['email'];
  }

  protected contentSupportValidation(content: IContent): void | never {
    if (!this.supportedContents.includes(content.type)) {
      throw new Error(`Content of type ${content.type} is not supported in E-mail channel`);
    }
  }

}
