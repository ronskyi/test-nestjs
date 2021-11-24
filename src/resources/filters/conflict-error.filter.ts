import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainValidationError } from '../../domain/errors/domain-validation.error';

@Catch(DomainValidationError)
export class ConflictErrorFilter implements ExceptionFilter {
  catch(exception: DomainValidationError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errors = {};
    exception.errors.forEach(function (error) {
      errors[error.property] = error.constraints;
    });
    response.status(HttpStatus.CONFLICT).json(errors);
  }
}
