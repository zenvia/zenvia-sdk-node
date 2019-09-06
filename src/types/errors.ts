export interface IError {
  message: string;
  httpStatusCode?: number;
  body?: any;
  causedBy?: any;
}
