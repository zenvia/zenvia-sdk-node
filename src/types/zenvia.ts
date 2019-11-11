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
export type ContentType = 'text' | 'file' | 'template' | 'json';
export type MessageDirection = 'IN' | 'OUT';
export type EventType = 'MESSAGE' | 'MESSAGE_STATUS';
export type SubscriptionStatus = 'ACTIVE' | 'INACTIVE';
export type MessageStatusCode = 'REJECTED' | 'SENT' | 'DELIVERED' | 'NOT_DELIVERED' | 'READ';

export interface IChannel {
  sendMessage(from: string, to: string, ...contents: IContent[]): Promise<IMessage>;
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

export interface IJsonContent extends IContent {
  payload: any;
}

export interface IMessageRequest {
  from: string;
  to: string;
  contents: IContent[];
}

export interface IMessage extends IMessageRequest {
  id: string;
  direction: MessageDirection;
  channel: Channel;
}

export interface IMessageStatus extends IMessageRequest {
  timestamp: string;
  code: MessageStatusCode;
  description?: string;
  cause?: string;
}

/**
 * Interface of base event.
 */
export interface IEvent {
  /**
   * Event identifier.
   */
  id: string;
  /**
   * Timestamp of event occurrence.
   */
  timestamp: string;
  /**
   * Event type. An [[EventType]] object.
   */
  type: EventType;
  /**
   * Subscription identifier.
   */
  subscriptionId: string;
  /**
   * Message channel. An [[Channel]] object.
   */
  channel: Channel;
}

/**
 * Interface of message event.
 */
export interface IMessageEvent extends IEvent {
  /**
   * Message event type. An [[EventType]] object.
   */
  type: 'MESSAGE';
  /**
   * Message direction. An [[MessageDirection]] object.
   */
  direction: MessageDirection;
  /**
   * Message event. An [[IMessage]] object.
   */
  message: IMessage;
}

/**
 * Implementation of message status event.
 */
export interface IMessageStatusEvent extends IEvent {
  /**
   * Message status event type. An [[EventType]] object.
   */
  type: 'MESSAGE_STATUS';
  /**
   * Message identifier.
   */
  messageId: string;
  /**
   * Content index.
   */
  contentIndex: number;
  /**
   * Message status event. An [[IMessageStatus]] object.
   */
  messageStatus: IMessageStatus;
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

export interface IChannels {
  type: 'WHATSAPP' | 'FACEBOOK' | 'SMS';
  status: 'APPROVED' | 'REFUSED' | 'PENDING' | 'CANCELED';
  senderId: string;
}

export interface ITemplate {
  id?: any;
  text: string;
  fields: string[];
  channels: IChannels[];
  createdAt?: Date;
  updatedAt?: Date;
}
