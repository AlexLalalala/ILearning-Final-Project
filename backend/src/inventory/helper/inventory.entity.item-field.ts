export function AddItemFields(key: string, type: any) {
  return function (target: Function) {
    Object.defineProperty(target.prototype, key, {
      writable: true,
      configurable: true,
      enumerable: true,
    });
  };
}
