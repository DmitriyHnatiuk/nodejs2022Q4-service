import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { LoggingService } from 'src/logging/logging.service';

@Catch()
export class ExceptionsFilters implements ExceptionFilter {
  logger: any;
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.logger = new LoggingService();
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      message:
        exception instanceof Error &&
        exception.message &&
        httpStatus !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message
          : 'Internal Server Error',
    };
    const message = exception.toString();
    const stackTrace = exception['stack'];

    const log = `[${req.method}] ${req.originalUrl} ${
      Object.keys(req.body).length ? JSON.stringify(req.body) : ''
    } [${httpStatus}]`;

    httpStatus < HttpStatus.INTERNAL_SERVER_ERROR
      ? this.logger.warn(log)
      : this.logger.error(`${log} \n ${message}`, stackTrace);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
