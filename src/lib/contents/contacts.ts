import { AbstractContent } from './abstract-content';
import { IContactsContent } from '../../types';

/**
 * Implementation of contacts content.
 */
export class ContactsContent extends AbstractContent implements IContactsContent {

  contacts: any;

  /**
   * Returns a new `ContactsContent` that can be used to send array of contacts to your customer.
   *
   * @param contacts An [[IContactsContent]] object.
   */
  constructor(contacts: any) {
    super('contacts');
    this.contacts = contacts;
  }

}
