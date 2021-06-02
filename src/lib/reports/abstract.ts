import * as request from '../../utils/request';
import { Logger } from '../../utils/logger';
import { ILoggerInstance } from '../../types';
// tslint:disable-next-line: no-empty-interface
export interface IReportEntry {
}
export interface IReportFilters {
  [param: string]: string|Date|number;
}

/**
 * Implementation of base report.
 */
export class AbstractReport<E extends IReportEntry, F extends IReportFilters> {

  protected logger: Logger;

  constructor(private reportName: string, private token: string, loggerInstance?: ILoggerInstance) {
    this.logger = new Logger(loggerInstance);
  }

  /**
   * This method returns entries from an report.
   *
   * @param filters - An [[IReportFilters]] object to filter the request.
   * @returns A promise that resolves to an array of [[IReportEntry]] objects.
   */
  getEntries(filters: F): Promise<E[]> {
    const properties = [];
    for (const [key, value] of Object.entries(filters)) {
      properties.push(`${key}=${value}`);
    }

    const path = `/v2/reports/${this.reportName}/entries`;
    let queryParameters = '';
    if (properties.length > 0) {
      queryParameters = `?${properties.join('&')}`;
    }
    return request.get(this.token, path + queryParameters, this.logger);
  }

}
