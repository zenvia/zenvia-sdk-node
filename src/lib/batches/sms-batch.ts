import { Batch } from './base';
import { Channel, ContentType, IContent, ILoggerInstance } from '../../types';
import { stringify } from 'querystring';

/**
 * Implementation of SMS batch.
 */
export class SmsBatch extends Batch {
  
  constructor(name: string, channel: Channel, columnMapper: {[name: string]: string}, from: string, texts: string[]) {
    super(name, channel, columnMapper, null);
    this.message = {
      from,
      contents: [],
    }; 

    texts.forEach(text => this.message.contents.push({type: 'text', text}));
  }

}
