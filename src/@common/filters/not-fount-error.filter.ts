import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ObjectNotFoundError } from '../errors/object-not-found.error';

@Catch(ObjectNotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
  catch(exception: ObjectNotFoundError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.NOT_FOUND).json(null);
  }
}
