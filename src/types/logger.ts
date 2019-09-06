export interface ILoggerInstance {
  debug: (data: string, ...args: any[]) => void;
  error: (data: string, ...args: any[]) => void;
  warn: (data: string, ...args: any[]) => void;
}
