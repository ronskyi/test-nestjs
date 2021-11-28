export class UniqueViolationError extends Error {
  constructor() {
    super('Unique constraint violation error');
  }
}
