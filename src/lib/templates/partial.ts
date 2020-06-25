import { IComponents, IPartialTemplate } from '../../types';

/**
 * Implementation of base templates.
 */
export abstract class PartialTemplate implements IPartialTemplate {

  notificationEmail: string;
  components: IComponents;

  /**
   * Returns a new `Template` that is used to create a new template.
   *
   * @param notificationEmail Mail list (comma-separated) to send notifications about the message template approving process.
   * @param components An [[IComponents]] object.
   */

  constructor(notificationEmail?: string, components?: IComponents) {
    this.notificationEmail = notificationEmail;
    this.components = components;
  }

}
