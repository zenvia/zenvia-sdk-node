import { Headers } from 'request';

export interface IClientOptions {
  /** Custom headers that will be sent in every request. */
  customHeaders?: Headers;
}

export interface IRequestOptions extends IClientOptions {
  formData?: any;
}
