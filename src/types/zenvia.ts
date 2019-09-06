// tslint:disable:prefer-array-literal
import { SmsChannel } from '../lib/channels/sms';
import { FacebookChannel } from '../lib/channels/facebook';
import { WhatsAppChannel } from '../lib/channels/whatsapp';
import { TextContent } from '../lib/contents/text';
import { FileContent } from '../lib/contents/file';
import { TemplateContent } from '../lib/contents/template';
import { MessageSubscription } from '../lib/subscriptions/message';
import { MessageStatusSubscription } from '../lib/subscriptions/message-status';

export { SmsChannel, FacebookChannel, WhatsAppChannel, TextContent, FileContent, TemplateContent, MessageSubscription, MessageStatusSubscription };

export type Channel = 'sms' | 'whatsapp' | 'facebook';
export type ContentType = 'text' | 'file' | 'template';
export type MessageDirection = 'IN' | 'OUT';
export type EventType = 'MESSAGE' | 'MESSAGE_STATUS';
export type SubscriptionStatus = 'ACTIVE' | 'INACTIVE';

export interface IChannel {
  sendMessage(from: string, to: string, ...contents: IContent[]): Promise<IMessageResponse>;
}

export interface IContent {
  type: ContentType;
}

export interface ITextContent extends IContent {
  text: string;
}

export interface IFileContent extends IContent {
  fileUrl: string;
  fileMimeType: string;
  fileCaption?: string;
}

export interface ITemplateContent extends IContent {
  templateId: string;
  fields: {
    [name: string]: string;
  };
}

export interface IMessageRequest {
  from: string;
  to: string;
  contents: IContent[];
}

export interface IMessageResponse {
  id: string;
  from: string;
  to: string;
  direction: MessageDirection;
  channel: Channel;
  contents: IContent[];
}

export interface ISubscription {
  id?: any;
  eventType: EventType;
  webhook: IWebhook;
  criteria: {
    channel: Channel;
    direction?: MessageDirection;
  };
  status: SubscriptionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPartialSubscription {
  webhook?: IWebhook;
  status?: SubscriptionStatus;
}

export interface ICriteria {
  channel: Channel;
}

export interface IMessageCriteria extends ICriteria {
  direction?: MessageDirection;
}

export interface IWebhook {
  url: string;
  headers?: {
    [header: string]: string;
  };
}
