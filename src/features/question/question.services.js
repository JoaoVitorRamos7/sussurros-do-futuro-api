import ErrorHandling from '../../shared/errors/error-handling.js';
import InputError from '../../shared/errors/input-error.js';
import * as questionRepository from './question.repository.js';

/**
 * @description Creates a new question in the database.
 * @param {string} content represent the value to save on database.
 * @returns {Promise} a promise that resolves to the result of the insert query.
 */
export async function createQuestion(content) {
  try {
    if (!content) {
      throw new InputError('Content is required to create an question');
    }

    if (typeof content !== 'string') {
      throw new InputError('Content must be a string');
    }

    if (content.length < 10) {
      throw new InputError('Content must be at least 10 characters long');
    }

    return questionRepository.createQuestion(content);
    
  } catch (error) {
    throw new ErrorHandling(error.statusCode, `Failed to create question: ${error.message}`, 'Failed to create question');
  }
}

/**
 * @description Retrieves all questions from the database.
 * @returns {Promise} a promise that resolves to the list of questions.
 */
export async function getQuestions(offset = 0, limit = 10) {
  try {
    return await questionRepository.getAllQuestions(offset, limit);
  } catch (error) {
    throw new ErrorHandling(error.statusCode, `Failed to fetch questions: ${error.message}`, 'Failed to fetch question');
  }
}

/**
 * @description Retrieves an question by its ID from the database.
 * @param {number} id 
 * @returns 
 */
export async function getQuestionById(id) {
  try {
    if (!id) {
      throw new InputError('Question ID is required');
    }

    if (typeof id !== 'number') {
      throw new InputError('Question ID must be a number');
    }

    const question = await questionRepository.getQuestionById(id);

    if (!question) {
      throw new InputError('Question not found');
    }

    return question;
  } catch (error) {
    throw new ErrorHandling(error.statusCode, `Failed to fetch question by ID: ${error.message}`, 'Failed to fetch question');
  }
}

export async function updateQuestion(id, content) {
  try {
    if (!id) {
      throw new InputError('Question ID is required');
    }

    if (!content) {
      throw new InputError('Content is required to update an question');
    }

    if (typeof content !== 'string') {
      throw new InputError('Content must be a string');
    }

    if (content.length < 3) {
      throw new InputError('Content must be at least 3 characters long');
    }

    return await questionRepository.updateQuestion(id, content);
  } catch (error) {
    throw new ErrorHandling(error.statusCode, `Failed to update question: ${error.message}`, 'Failed to update question');
  }
}

export async function deleteQuestion(id) {
  try {
    if (!id) {
      throw new InputError('Question ID is required');
    }
    
    if (typeof id !== 'number') {
      throw new InputError('Question ID must be a number');
    }

    return await questionRepository.deleteQuestion(id);
  } catch (error) {
    throw new ErrorHandling(error.statusCode, `Failed to delete question: ${error.message}`, 'Failed to delete question');
  }
}