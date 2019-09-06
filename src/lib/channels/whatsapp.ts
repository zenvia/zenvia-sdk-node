import { AbstractChannel } from './abstract-channel';
import { ContentType, IContent, ILoggerInstance } from '../../types';

export class WhatsAppChannel extends AbstractChannel {

  private supportedContents: ContentType[];

  constructor(token: string, loggerInstance?: ILoggerInstance) {
    super(token, 'whatsapp', loggerInstance);
    this.supportedContents = ['text', 'file', 'template'];
  }

  protected contentSupportValidation(content: IContent): void | never {
    if (!this.supportedContents.includes(content.type)) {
      throw new Error(`Content of type ${content.type} is not supported in WhatsApp channel`);
    }
  }

}
