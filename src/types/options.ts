import { Headers } from 'request';

export interface IClientOptions {
  /** Custom headers that will be sent in every request. */
  customHeaders?: Headers;
}
