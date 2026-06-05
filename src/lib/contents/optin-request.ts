import { IOptInRequestContent, OptInFrequency, OptInReOptIn } from '../../types';
import { AbstractContent } from './abstract-content';

export class OptInRequestContent extends AbstractContent implements IOptInRequestContent {
  mediaUrl?: string;
  title?: string;
  frequency?: OptInFrequency;
  reOptIn?: OptInReOptIn;
  payload?: string;
  timezone?: string;

  constructor(mediaUrl?: string, title?: string, frequency?: OptInFrequency, reOptIn?: OptInReOptIn, payload?: string, timezone?: string) {
    super('optin_request');
    this.mediaUrl = mediaUrl;
    this.title = title;
    this.frequency = frequency;
    this.reOptIn = reOptIn;
    this.payload = payload;
    this.timezone = timezone;
  }
}
