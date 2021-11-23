import { ValidationError } from 'class-validator/types/validation/ValidationError';

export class DomainValidationError extends Error {
  constructor(private _errors: ValidationError[]) {
    super();
  }

  get errors(): ValidationError[] {
    return this._errors;
  }
}