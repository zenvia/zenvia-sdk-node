import { AbstractMessageBatch } from './abstract-message-batch';
import { IWhatsAppMessageBatch, IMessageBatchColumnMapper, IBatchTemplateContent } from '../../types';

/**
 * Implementation of WhatsApp batch.
 */
export class WhatsAppMessageBatch extends AbstractMessageBatch<'whatsapp', IBatchTemplateContent> implements IWhatsAppMessageBatch {
  
  constructor(name: string, from: string, templateIds: string[] | string, columnMapper: IMessageBatchColumnMapper) {

    super(name, 'whatsapp', null, columnMapper);
    this.message = {
      from,
      contents: [],
    };

    (typeof templateIds === 'string' ? [templateIds] : templateIds).forEach(templateId => this.message.contents.push({type: 'template', templateId}));
  }

}