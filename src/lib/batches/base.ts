import * as fs from 'fs';
import { ReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { IBatch, Channel, IBatchMessage } from '../../types';
import * as request from '../../utils/request';

/**
 * Implementation of batch.
 */
export abstract class Batch implements IBatch {

  constructor (public name: string, public channel: Channel, public columnMapper: {[name: string]: string}, public message: IBatchMessage) {};

}
