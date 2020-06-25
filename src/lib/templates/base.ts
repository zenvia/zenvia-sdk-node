import { ITemplate, IComponents } from '../../types';

/**
 * Implementation of base templates.
 */
export abstract class Template implements ITemplate {

  name: string;
  locale: string;
  channel: string;
  category: string;
  senderId: string;
  notificationEmail: string;
  components: IComponents;

  /**
   * Returns a new `Template` that is used to create a new template.
   *
   * @param name The name to identifier the template.
   * @param locale The language and locale.
   * @param channel The channel who template will be used.
   * @param category The category used to identifier in WhatsApp.
   * @param senderId This is the identifier of sender for this template. The sender shoud be created with a credential.
   * @param notificationEmail Mail list (comma-separated) to send notifications about the message template approving process.
   * @param components An [[IComponents]] object.
   */

  constructor(name: string, locale: string, channel: string, category: string, senderId: string, notificationEmail: string, components: IComponents) {
    this.name = name;
    this.locale = locale;
    this.channel = channel;
    this.category = category;
    this.senderId = senderId;
    this.notificationEmail = notificationEmail;
    this.components = components;
  }
}
