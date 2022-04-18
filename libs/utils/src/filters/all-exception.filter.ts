import { Catch, ArgumentsHost, Logger, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: HttpException | unknown, host: ArgumentsHost) {
    this.logger.error(
      exception instanceof HttpException ? { ...exception } : exception,
    );
    super.catch(exception, host);
  }
}
