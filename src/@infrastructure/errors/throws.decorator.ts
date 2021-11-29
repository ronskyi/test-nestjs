export function Throws(transform: (error: any) => Error) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      try {
        const result = originalMethod.apply(this, args);
        if (result && result instanceof Promise) {
          return result.catch((error: any) => {
            throw transform(error);
          });
        }
        return result;
      } catch (error) {
        throw transform(error);
      }
    };
    return descriptor;
  };
}
