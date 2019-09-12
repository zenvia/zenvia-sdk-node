import { IContent, ContentType } from '../../types';

/**
 * Implementation of base content.
 */
export abstract class AbstractContent implements IContent {

  type: ContentType;

  constructor(type: ContentType) {
    this.type = type;
  }

}
