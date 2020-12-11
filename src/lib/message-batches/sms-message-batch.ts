import { AbstractMessageBatch } from './abstract-message-batch';
import { ISmsMessageBatch, IMessageBatchColumnMapper, IBatchTextContent } from '../../types';

/**
 * Implementation of SMS batch.
 */
export class SmsMessageBatch extends AbstractMessageBatch<'sms', IBatchTextContent> implements ISmsMessageBatch {
  
  constructor(name: string, from: string, texts: string[] | string, columnMapper: IMessageBatchColumnMapper) {
    super(name, 'sms', null, columnMapper);
    this.message = {
      from,
      contents: [],
    }; 

    (typeof texts === 'string' ? [texts] : texts).forEach(text => this.message.contents.push({type: 'text', text}));
  }

}