
import { AbstractReport, IReportFilters, IReportEntry } from './abstract';
import { MessageType, ILoggerInstance, IClientOptions } from '../../types';

interface IReportMessagesFilters extends IReportFilters {
  startDate: string;
  endDate: string;
  channels?: string;
  type?: MessageType;
}

interface IReportMessagesEntry extends IReportEntry {
  channel: string;
  type: string;
  directionInTotal: number;
  directionOutTotal: number;
  total: number;
}

export class ReportMessages extends AbstractReport<IReportMessagesEntry, IReportMessagesFilters> {
  constructor(token: string, loggerInstance: ILoggerInstance, options: IClientOptions) {
    super('message', token, loggerInstance, options);
  }
}
