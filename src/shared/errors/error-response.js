import ErrorHandling from './error-handling.js';
import InputError from './input-error.js';

export default function handleError(error, res) {
  if (error instanceof InputError) {
    res.status(error.statusCode).json(new ErrorHandling(
      error.statusCode,
      error.message,
      'Invalid input provided. Please check your request and try again.',
      'INPUT_ERROR',
      null
    ));
  } else if (error instanceof ErrorHandling) {
    res.status(error.statusCode).json(error);
  } else {
    res.status(500).json(new ErrorHandling(500, 'Internal Server Error', 'An unexpected error occurred.', 'INTERNAL_ERROR', null));
  }
}