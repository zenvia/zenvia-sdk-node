import { AbstractContent } from './abstract-content';
import { ITemplateContent } from '../../types';

export class TemplateContent extends AbstractContent implements ITemplateContent {

  templateId: string;
  fields: { [name: string]: string; };

  constructor(id: string, fields: { [name: string]: string; }) {
    super('template');
    this.templateId = id;
    this.fields = fields;
  }

}
