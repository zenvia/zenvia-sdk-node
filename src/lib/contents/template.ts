import { AbstractContent } from './abstract-content';
import { ITemplateContent } from '../../types';

/**
 * Implementation of template content.
 */
export class TemplateContent extends AbstractContent implements ITemplateContent {

  templateId: string;
  fields: { [name: string]: string; };

  /**
   * Returns a new `TemplateContent` that can be used to send message templates to your customer.
   *
   * @param templateId The template identifier on the Zenvia platform.
   * @param fields The array of values to apply in the template.
   */
  constructor(id: string, fields: { [name: string]: string; }) {
    super('template');
    this.templateId = id;
    this.fields = fields;
  }

}
