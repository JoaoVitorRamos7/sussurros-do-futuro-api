export default class InputError extends Error {
  constructor(message) {
    super('InputError: ' + message);
    this.statusCode = 400;
  }
}