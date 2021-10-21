
import { AbstractReport, IReportFilters, IReportEntry } from './abstract';
import { ILoggerInstance, IClientOptions } from '../../types';

interface IReportFlowFilters extends IReportFilters {
  startDate: string;
  endDate?: string;
  flowId?: string;
  dispatchId?: string;
  sessionId?: string;
}

interface IReportFlowEntry extends IReportEntry {
  flowId: string;
  dispatchId: string;
  sessionId: string;
  firstEventTimestamp: string;
  lastEventTimestamp: string;
  variables: any;
}

export class ReportFlow extends AbstractReport<IReportFlowEntry, IReportFlowFilters> {
  constructor(token: string, loggerInstance: ILoggerInstance, options: IClientOptions) {
    super('flow', token, loggerInstance, options);
  }
}
