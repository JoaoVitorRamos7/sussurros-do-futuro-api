export default class ErrorHandling {
  /**
   * @description This is a template for error handling. It can be used to create custom error classes that extend this base class.
   * The constructor takes in parameters that provide detailed information about the error, which can be useful for both developers and end-users.
   * @param {number} statusCode 
   * @param {string} developerMessage 
   * @param {string} userMessage 
   * @param {string} errorCode 
   * @param {string} moreInfo 
   */
  constructor(statusCode, developerMessage, userMessage, errorCode, moreInfo) {
    this.statusCode = statusCode || 500;
    this.developerMessage = developerMessage || 'An unexpected error occurred. Please check the server logs for more details.';
    this.userMessage = userMessage || 'An error occurred while processing your request. Please try again later.';
    this.errorCode = errorCode || 'INTERNAL_ERROR';
    this.moreInfo = moreInfo || null;
  }
}