import { BadRequestException, HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const BadRequestExceptionFactory = function (
  validationErrors: ValidationError[] = [],
): HttpException {
  const errors = {};
  validationErrors.forEach(function (error) {
    errors[error.property] = error.constraints;
  });
  return new BadRequestException(errors);
};
