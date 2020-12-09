import { Batch } from './base';
import { Channel, ContentType, IContent, ILoggerInstance } from '../../types';
import { stringify } from 'querystring';

/**
 * Implementation of WhatsApp batch.
 */
export class WhatsAppBatch extends Batch {
  
  constructor(name: string, channel: Channel, columnMapper: {[name: string]: string}, from: string, templateIds: string[]) {
    super(name, channel, columnMapper, null);
    this.message = {
      from,
      contents: [],
    };

    templateIds.forEach(templateId => this.message.contents.push({type: 'template', templateId}));
  }

}
