import { IChannel, IMessageRequest, IMessageResponse, Channel, IContent, ILoggerInstance } from '../../types';
import { Logger } from '../../utils/logger';
import * as request from '../../utils/request';

/**
 * Implementation of base channel.
 */
export abstract class AbstractChannel implements IChannel {

  private token: string;
  private channel: Channel;
  protected logger: Logger;

  constructor(token: string, channel: Channel, loggerInstance?: ILoggerInstance) {
    this.token = token;
    this.channel = channel;
    this.logger = new Logger(loggerInstance);
  }

  /**
   * This method sends the message to the channel.
   *
   * @param from The sender identifier of the message.
   * @param to The recipient identifier of the message.
   * @param contents An array of [[IContent]] object that will be sent.
   * @returns A promise that resolves to an [[IMessageResponse]] object.
   */
  async sendMessage(from: string, to: string, ...contents: IContent[]): Promise<IMessageResponse> {
    contents.forEach(content => this.contentSupportValidation(content));
    const message = this.createMessage(from, to, contents);
    this.logger.debug(`Sending message to ${to} on channel ${this.channel}`);
    return this.request(message);
  }

  /**
   * This method creates a message.
   *
   * @param from The sender identifier of the message.
   * @param to The recipient identifier of the message.
   * @param contents An array of [[IContent]] object that will be sent.
   * @returns An [[IMessageRequest]] object.
   */
  private createMessage(from: string, to: string, contents: IContent[]): IMessageRequest  {
    return {
      from,
      to,
      contents,
    };
  }

  /**
   * This method requests to the endpoint.
   *
   * @param message An [[IMessageRequest]] object.
   * @returns A promise that resolves to an [[IMessageResponse]] object.
   */
  private async request(message: IMessageRequest): Promise<IMessageResponse> {
    const path = `/v1/channels/${this.channel}/messages`;
    return request.post(this.token, path, message, this.logger);
  }

  protected abstract contentSupportValidation(content: IContent): void | never;

}
