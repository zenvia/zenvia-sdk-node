import { IMessageBatch, Channel, MessageBatchContent, IMessageBatchColumnMapper } from '../../types';

/**
 * Implementation of batch.
 */
export abstract class AbstractMessageBatch<C extends Channel, MBC extends MessageBatchContent> implements IMessageBatch {

  constructor (public name: string, public channel: C, public message: {from: string, contents: MBC[]}, public columnMapper: IMessageBatchColumnMapper) {}

}
