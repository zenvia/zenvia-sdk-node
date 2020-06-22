// tslint:disable:prefer-array-literal
import { SmsChannel } from '../lib/channels/sms';
import { FacebookChannel } from '../lib/channels/facebook';
import { WhatsAppChannel } from '../lib/channels/whatsapp';
import { TextContent } from '../lib/contents/text';
import { FileContent } from '../lib/contents/file';
import { ContactsContent } from '../lib/contents/contacts';
import { TemplateContent } from '../lib/contents/template';
import { LocationContent } from '../lib/contents/location';
import { Template } from '../lib/templates/base';
import { PartialTemplate } from '../lib/templates/partial';
import { MessageSubscription } from '../lib/subscriptions/message';
import { MessageStatusSubscription } from '../lib/subscriptions/message-status';

export {
  SmsChannel,
  FacebookChannel,
  WhatsAppChannel,
  TextContent,
  FileContent,
  Template,
  PartialTemplate,
  LocationContent,
  ContactsContent,
  TemplateContent,
  MessageSubscription,
  MessageStatusSubscription
};

export type Channel = 'sms' | 'whatsapp' | 'facebook';
export type ContentType = 'text' | 'file' | 'template' | 'contacts' | 'location' | 'json';
export type MessageType = 'message' | 'notification';
export type MessageDirection = 'IN' | 'OUT';
export type EventType = 'MESSAGE' | 'MESSAGE_STATUS';
export type SubscriptionStatus = 'ACTIVE' | 'INACTIVE';
export type MessageStatusCode = 'REJECTED' | 'SENT' | 'DELIVERED' | 'NOT_DELIVERED' | 'READ';
export type TemplateStatus = 'WAITING_REVIEW' | 'REJECTED' | 'WAITING_WHATSAPP_SUBMISSION' | 'WAITING_WHATSAPP_REVIEW' | 'APPROVED' | 'CANCELED';

export interface IChannel {
  sendMessage(from: string, to: string, ...contents: IContent[]): Promise<IMessage>;
}

export interface IContent {
  type: ContentType;
}

export interface ITextContent extends IContent {
  text: string;
  payload?: string;
}

export interface IFileContent extends IContent {
  fileUrl: string;
  fileMimeType: string;
  fileCaption?: string;
}

export interface IContactsContent extends IContent {
  contacts: Array<{
    addresses?: Array<{
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
      countryCode?: string;
      type?: 'HOME' | 'WORK';
    }>;
    birthday?: string;
    contactImage?: string;
    emails?: Array<{
      email?: string;
      type?: 'HOME' | 'WORK';
    }>;
    ims?: Array<{
      service: string;
      userId: string;
    }>;
    name?: {
      formattedName: string;
      firstName: string;
      lastName?: string;
      middleName?: string;
      suffix?: string;
      prefix?: string;
    };
    org?: {
      company?: string;
      department?: string;
      title?: string;
    };
    phones?: Array<{
      phone?: string;
      type?: 'CELL' | 'MAIN' | 'IPHONE' | 'HOME' | 'WORK';
      waId?: string;
    }>;
    urls?: Array<{
      url?: string;
      type?: 'HOME' | 'WORK';
    }>;
  }>;
}


export interface ILocationContent extends IContent {
  longitude: number;
  latitude: number;
  name?: string;
  address?: string;
  url?: string;
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

export interface ITemplateChannel {
  type: Channel;
  status: TemplateStatus;
  senderId: string;
}

export interface IFlowReport {
  flowId: string;
  dispatchId: string;
  sessionId: string;
  firstEventTimestamp: string;
  lastEventTimestamp: string;
  variables: any;
}

export interface IMessageReport {
  channel: string;
  type: string;
  directionInTotal: number;
  directionOutTotal: number;
  total: number;
}

export interface ITemplate {
  id?: string;
  name: string;
  locale: string;
  channel: string;
  category: string;
  textReference?: string;
  components: IComponents;
  senderId: string;
  status?: TemplateStatus;
  notificationEmail?: string;
  comments?: IComment[];
  suggestions?: ISuggestions[];
  channels?: IChannels[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IPartialTemplate {
  components?: IComponents;
  notificationEmail?: string;
}

export interface IComment {
  id?: any;
  author: string;
  role: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISuggestions {
  id?: any;
  status: string;
  text: string;
  createdAt: string;
  updateAt: string;
}

export interface IComponents {
  header?: {
    type: string,
    text: string,
  }
  body: {
    type: string,
    text: string,
  },
  footer?: {
    type: string,
    text: string,
  },
  buttons?: {
    type: string,
    items: IButtonsItems[];
  }
}

export interface IButtonsItems {
  type: string,
  text: string,
  url?: string,
  phoneNumber?: string,
  payload?: string,
}

export interface IChannels {
  type: 'WHATSAPP' | 'FACEBOOK' | 'SMS';
  status: 'APPROVED' | 'REFUSED' | 'PENDING' | 'CANCELED';
  senderId: string;
  whatsapp: any;
}
