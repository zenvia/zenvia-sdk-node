/* tslint:disable:no-unused-expression */

import * as sinon from 'sinon';
import { Logger } from '../../src/utils/logger';
import { ILoggerInstance } from '../../src/types';

describe('Logger', () => {

  it('should create Logger without instance', async () => {
    const logger = new Logger(undefined);
    logger.error('error message');
    logger.debug('debug message');
    logger.warn('warning message');
  });

  it('should use instance methods to log messages', async () => {
    const loggerStub: ILoggerInstance = {
      error: sinon.spy(),
      debug: sinon.spy(),
      warn: sinon.spy(),
    };

    const logger = new Logger(loggerStub);
    logger.error('error message');
    logger.debug('debug message');
    logger.warn('warning message');
    loggerStub.error.should.be.calledOnce;
    loggerStub.error.should.be.calledWith('error message');
    loggerStub.debug.should.be.calledOnce;
    loggerStub.debug.should.be.calledWith('debug message');
    loggerStub.warn.should.be.calledOnce;
    loggerStub.warn.should.be.calledWith('warning message');
  });
});
