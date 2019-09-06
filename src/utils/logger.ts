import { ILoggerInstance } from '../types';

export class Logger implements ILoggerInstance {

  private instance;

  constructor(instance: ILoggerInstance) {
    this.instance = instance;
  }

  debug(data: string, ...args: any[]): void {
    if (this.instance) {
      this.instance.debug(data, ...args);
    }
  }

  error(data: string, ...args: any[]): void {
    if (this.instance) {
      this.instance.error(data, ...args);
    }
  }

  warn(data: string, ...args: any[]): void {
    if (this.instance) {
      this.instance.warn(data, ...args);
    }
  }

}
