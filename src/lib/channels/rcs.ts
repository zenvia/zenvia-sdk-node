import { AbstractChannel } from './abstract-channel';
import { ContentType, IContent, ILoggerInstance } from '../../types';

/**
 * Implementation of RCS channel.
 */
export class RcsChannel extends AbstractChannel {

  private supportedContents: ContentType[];

  /**
   * Returns a new `RCSChannel` that is used to set the RCS channel.
   *
   * @param token Zenvia platform token.
   * @param loggerInstance If you want, you can pass your log instance.
   */
  constructor(token: string, loggerInstance?: ILoggerInstance) {
    super(token, 'rcs', loggerInstance);
    this.supportedContents = ['text', 'file'];
  }

  protected contentSupportValidation(content: IContent): void | never {
    if (!this.supportedContents.includes(content.type)) {
      throw new Error(`Content of type ${content.type} is not supported in RCS channel`);
    }
  }

}
