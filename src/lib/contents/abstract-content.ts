import { IContent, ContentType } from '../../types';

export abstract class AbstractContent implements IContent {

  type: ContentType;

  constructor(type: ContentType) {
    this.type = type;
  }

}
