import * as request from '../../utils/request';
import { Logger } from '../../utils/logger';
import { ILoggerInstance } from '../../types';
export interface IReportEntry {
}
export interface IReportFilters {
  [param: string]: string|Date|number;
}

export class AbstractReport<E extends IReportEntry, F extends IReportFilters> {

  protected logger: Logger;

  constructor(private reportName: string, private token: string, loggerInstance?: ILoggerInstance) {
    this.logger = new Logger(loggerInstance);
  }

  getEntries(filters: F): Promise<E[]> {
    const properties = [];
    for (const [key, value] of (filters as any).entries()) {
      properties.push(`${key}=${value}`);
    }

    const path = `/v1/reports/${this.reportName}/entries`;
    let queryParameters = '';
    if (properties.length > 0) {
      queryParameters = '?' + properties.join('&');
    }
    return request.get(this.token, path + queryParameters, this.logger);
  }

}
