import { AbstractChannel } from './abstract-channel';
import { ContentType, IContent, ILoggerInstance } from '../../types';

export class FacebookChannel extends AbstractChannel {

  private supportedContents: ContentType[];

  constructor(token: string, loggerInstance?: ILoggerInstance) {
    super(token, 'facebook', loggerInstance);
    this.supportedContents = ['text', 'file'];
  }

  protected contentSupportValidation(content: IContent): void | never {
    if (!this.supportedContents.includes(content.type)) {
      throw new Error(`Content of type ${content.type} is not supported in Facebook channel`);
    }
  }

}
