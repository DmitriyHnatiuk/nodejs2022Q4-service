import { ConsoleLogger, Injectable } from '@nestjs/common';
import { generateMessage, getLogLevel } from 'src/utils';
import { addToFile } from 'src/utils/log-to-file';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor() {
    super();
    this.options = { logLevels: getLogLevel() };
  }

  log(message: string) {
    super.log(message);
    addToFile(message, 'LOG');
  }

  error(message: string, trace: string) {
    super.error(message, trace);
    addToFile(message + '\n' + trace, 'ERROR');
  }

  warn(message: string) {
    super.warn(generateMessage('WARNING', message));
    addToFile(message, 'WARNING');
  }

  debug(message: string) {
    super.debug(generateMessage('DEBUG', message));
    addToFile(message, 'DEBUG');
  }

  verbose(message: string) {
    super.verbose(generateMessage('VERBOSE', message));
    addToFile(message, 'VERBOSE');
  }
}
