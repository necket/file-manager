export const throwOperationError = (message = '') => {
  throw new Error(`Operation failed: ${message}`);
}