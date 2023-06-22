import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('close', () => {
      const time = Date.now() - start;

      const log = `[${req.method}] ${req.originalUrl} ${
        Object.keys(req.body).length ? JSON.stringify(req.body) : ''
      } [${res.statusCode}] ${time}ms`;

      if (res.statusCode < HttpStatus.BAD_REQUEST) {
        return this.logger.log(log);
      }
    }),
      next();
  }
}
