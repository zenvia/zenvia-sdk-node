import * as rp from 'request-promise';
import { ILoggerInstance, IError } from '../types';

const url = 'https://api.zenvia.com';

export async function post(token: string, path: string, body: object, logger: ILoggerInstance, formData?: any): Promise<any> {
  return request(token, 'post', path, body, logger, formData);
}

export async function get(token: string, path: string, logger: ILoggerInstance): Promise<any> {
  return request(token, 'get', path, undefined, logger);
}

export async function patch(token: string, path: string, body: object, logger: ILoggerInstance): Promise<any> {
  return request(token, 'patch', path, body, logger);
}

export async function del(token: string, path: string, logger: ILoggerInstance): Promise<any> {
  return request(token, 'delete', path, undefined, logger);
}

async function request(token: string, method: string, path: string, body: object, logger: ILoggerInstance, formData?: any): Promise<any> {
  const uri = `${url}${path}`;
  const data = {
    method,
    uri,
    body,
    formData,
    headers: {
      'X-API-Token': `${token}`,
    },
    json: true,
    forever: true,
    simple: false,
    resolveWithFullResponse: true,
  };
  let error: IError;
  logger.debug(`Starting request with following data: ${JSON.stringify(data)}`);
  const startTime = Date.now();
  try {
    const response = await rp(data);
    const elapsedTime = Date.now() - startTime;
    if (response.statusCode >= 200 && response.statusCode < 300) {
      logger.debug(`Success on send ${method} request to ${uri} takes ${elapsedTime} miliseconds and return status code ${response.statusCode}`);
      return response.body;
    }
    logger.warn(`The performed request take ${elapsedTime} miliseconds and return a non 2xx status code ${response.statusCode}`);
    error = {
      httpStatusCode: response.statusCode,
      message: 'Unsuccessful request',
      body: Buffer.isBuffer(response.body) ? response.body.toString() : response.body,
    };
  } catch (e) {
    const elapsedTime = Date.now() - startTime;
    logger.error(`Error on try to send request that takes ${elapsedTime} miliseconds`, e);
    error = {
      message: e.message,
      causedBy: e,
    };
  }
  throw error;
}
