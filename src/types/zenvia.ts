// tslint:disable:prefer-array-literal
import { SmsChannel } from '../lib/channels/sms';
import { RcsChannel } from '../lib/channels/rcs';
import { InstagramChannel } from '../lib/channels/instagram';
import { FacebookChannel } from '../lib/channels/facebook';
import { WhatsAppChannel } from '../lib/channels/whatsapp';
import { TelegramChannel } from '../lib/channels/telegram';
import { GbmChannel } from '../lib/channels/gbm';
import { EmailChannel } from '../lib/channels/email';
import { TextContent } from '../lib/contents/text';
import { FileContent } from '../lib/contents/file';
import { ContactsContent } from '../lib/contents/contacts';
import { TemplateContent } from '../lib/contents/template';
import { LocationContent } from '../lib/contents/location';
import { EmailContent } from '../lib/contents/email';
import { CardContent } from '../lib/contents/card';
import { CarouselContent } from '../lib/contents/carousel';
import { ReplyableTextContent } from '../lib/contents/replyable-text';
import { Template } from '../lib/templates/base';
import { PartialTemplate } from '../lib/templates/partial';
import { MessageSubscription } from '../lib/subscriptions/message';
import { MessageStatusSubscription } from '../lib/subscriptions/message-status';

export {
  SmsChannel,
  RcsChannel,
  InstagramChannel,
  FacebookChannel,
  WhatsAppChannel,
  TelegramChannel,
  GbmChannel,
  EmailChannel,
  TextContent,
  FileContent,
  EmailContent,
  CardContent,
  CarouselContent,
  ReplyableTextContent,
  Template,
  PartialTemplate,
  LocationContent,
  ContactsContent,
  TemplateContent,
  MessageSubscription,
  MessageStatusSubscription,
};

export type Channel = 'sms' | 'whatsapp' | 'facebook' | 'rcs' | 'instagram' | 'telegram' | 'gbm' | 'email';
export type ContentType = 'text' | 'file' | 'template' | 'contacts' | 'location' | 'json' | 'email' | 'card' | 'carousel' | 'replyable_text';
export type ButtonType = 'text' | 'link' | 'dial' | 'share_location' | 'view_location' | 'search_location';
export type Buttons = (IButtonText | IButtonLink | IButtonCalendarEvent | IButtonDial | IButtonSearchLocation | IButtonViewLocation)[]
export type MediaDispositionType = 'ON_THE_TOP_SHORT_HEIGHT' | 'ON_THE_TOP_MEDIUM_HEIGHT' | 'ON_THE_TOP_TALL_HEIGHT' | 'ON_THE_LEFT' | 'ON_THE_RIGHT'
export type CardWidthType = 'MEDIUM' | 'SMALL'
export type MessageType = 'message' | 'notification';
export type MessageDirection = 'IN' | 'OUT';
export type EventType = 'MESSAGE' | 'MESSAGE_STATUS';
export type SubscriptionStatus = 'ACTIVE' | 'INACTIVE';
export type MessageStatusCode = 'REJECTED' | 'SENT' | 'DELIVERED' | 'NOT_DELIVERED' | 'READ';
export type TemplateStatus = 'WAITING_REVIEW' | 'REJECTED' | 'WAITING_WHATSAPP_SUBMISSION' | 'WAITING_WHATSAPP_REVIEW' | 'APPROVED' | 'CANCELED';
type MessageBatchContentType = 'text' | 'template';
export type MessageBatchContent = IBatchTemplateContent | IBatchTextContent;
export type MessageBatch = ISmsMessageBatch | IWhatsAppMessageBatch;

export interface IChannel {
  sendMessage(from: string, to: string, ...contents: IContent[]): Promise<IMessage>;
}

export interface IContent {
  type: ContentType;
}

export interface IButtonText {
  type: ButtonType;
  text: string;
  payload?: string;
}

export interface IButtonLink extends IButtonText {
  url: string;
}

export interface IButtonCalendarEvent extends IButtonText {
  startTime: string;
  endTime: string;
  title: string;
}

export interface IButtonDial extends IButtonText {
  phoneNumber: string;
}

export interface IButtonViewLocation extends IButtonText {
  latitude: string;
  longitude: string;
  label?: string;
}

export interface IButtonSearchLocation extends IButtonText {
  query: string;
}

export interface IMedia {
  url: string;
  disposition?: MediaDispositionType;
  caption?: string
}

export interface ITextContent extends IContent {
  text: string;
  payload?: string;
}

export interface IFile {
  fileUrl: string;
  fileMimeType?: string;
  fileName?: string;
}

export interface IFileContent extends IContent, IFile {
  fileCaption?: string;
}

export interface IContactsContent extends IContent {
  contacts: {
    addresses?: {
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
      countryCode?: string;
      type?: 'HOME' | 'WORK';
    }[];
    birthday?: string;
    contactImage?: string;
    emails?: {
      email?: string;
      type?: 'HOME' | 'WORK';
    }[];
    ims?: {
      service: string;
      userId: string;
    }[];
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
    phones?: {
      phone?: string;
      type?: 'CELL' | 'MAIN' | 'IPHONE' | 'HOME' | 'WORK';
      waId?: string;
    }[];
    urls?: {
      url?: string;
      type?: 'HOME' | 'WORK';
    }[];
  }[];
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

export interface IEmailContent extends IContent {
  subject: string;
  html?: string;
  text?: string;
  attachments?: IFile[];
  cc?: string[];
  bcc?: string[];
}

export interface ICard extends IContent {
  title?: string;
  text?: string;
  media?: IMedia;
  buttons?: Buttons;  
}

export interface ICardContent extends ICard {
  quickReplyButtons?: Buttons
}

export interface ICarouselContent extends IContent {
  cardWidth?: CardWidthType;
  cards: ICard[];
  quickReplyButtons?: Buttons;
}

export interface IReplyableText extends IContent {
  text: string;
  quickReplyButtons?: Buttons;
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
  senderId: string;
  category: string;
  components: IComponents;
  examples?: {
    [fieldName: string]: string;
  };
  notificationEmail?: string;
  text?: string;
  fields?: string[];
  status?: TemplateStatus;
  comments?: IComment[];
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
    type: string;
    text: string;
  };
  body: {
    type: string;
    text: string;
  };
  footer?: {
    type: string;
    text: string;
  };
  buttons?: {
    type: string;
    items: IButtonsItems[];
  };
}

export interface IButtonsItems {
  type: string;
  text: string;
  url?: string;
  phoneNumber?: string;
  payload?: string;
}

export interface IChannels {
  type: 'WHATSAPP' | 'FACEBOOK' | 'SMS' | 'RCS' | 'INSTAGRAM' | 'TELEGRAM' | 'GBM' | 'EMAIL';
  status: 'APPROVED' | 'REFUSED' | 'PENDING' | 'CANCELED';
  senderId: string;
  whatsapp: any;
}

interface IMessageBatchContent {
  type: MessageBatchContentType;
}

export interface IBatchTemplateContent extends IMessageBatchContent {
  type: 'template';
  templateId: string;
}

export interface IBatchTextContent extends IMessageBatchContent {
  type: 'text';
  text: string;
}

export interface IMessageBatchColumnMapper {
  recipient_header_name: string;
  [name: string]: string;
}

export interface IMessageBatch {
  id?: string;
  name: string;
  channel: Channel;
  message: {
    from: string;
    contents: MessageBatchContent[];
  };
  columnMapper: IMessageBatchColumnMapper;
}

export interface ISmsMessageBatch extends IMessageBatch {
  channel: 'sms';
  message: {
    from: string,
    contents: IBatchTextContent[],
  };
}

export interface IWhatsAppMessageBatch extends IMessageBatch {
  channel: 'whatsapp';
  message: {
    from: string,
    contents: IBatchTemplateContent[],
  };
}
