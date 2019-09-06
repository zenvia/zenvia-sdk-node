import { IChannel, IMessageRequest, IMessageResponse, Channel, IContent, ILoggerInstance } from '../../types';
import { Logger } from '../../utils/logger';
import * as request from '../../utils/request';

export abstract class AbstractChannel implements IChannel {

  private token: string;
  private channel: Channel;
  protected logger: Logger;

  constructor(token: string, channel: Channel, loggerInstance?: ILoggerInstance) {
    this.token = token;
    this.channel = channel;
    this.logger = new Logger(loggerInstance);
  }

  async sendMessage(from: string, to: string, ...contents: IContent[]): Promise<IMessageResponse> {
    contents.forEach(content => this.contentSupportValidation(content));
    const message = this.createMessage(from, to, contents);
    this.logger.debug(`Sending message to ${to} on channel ${this.channel}`);
    return this.request(message);
  }

  private createMessage(from: string, to: string, contents: IContent[]): IMessageRequest  {
    return {
      from,
      to,
      contents,
    };
  }

  private async request(message: IMessageRequest): Promise<IMessageResponse> {
    const path = `/v1/channels/${this.channel}/messages`;
    return request.post(this.token, path, message, this.logger);
  }

  protected abstract contentSupportValidation(content: IContent): void | never;

}
