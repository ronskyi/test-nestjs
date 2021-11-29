import { Throws } from './throws.decorator';
import { UniqueViolationError } from './unique-violation.error';
import { QueryFailedError } from 'typeorm';

const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';

function isUniqueViolation(
  error: QueryFailedError,
): error is QueryFailedError & { code: string } {
  return (
    PG_UNIQUE_CONSTRAINT_VIOLATION ===
    (error as QueryFailedError & { code: string }).code
  );
}

export function ThrowsUniqueViolation(
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): void {
  Throws(function (error): Error {
    if (isUniqueViolation(error)) {
      throw new UniqueViolationError();
    }
    throw error;
  })(target, propertyKey, descriptor);
}
