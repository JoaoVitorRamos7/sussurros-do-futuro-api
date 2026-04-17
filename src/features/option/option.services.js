import ErrorHandling from '../../shared/errors/error-handling.js';
import InputError from '../../shared/errors/input-error.js';
import * as optionRepository from './option.repository.js';

/**
 * @description Creates a new option in the database.
 * @param {string} content represent the value to save on database.
 * @returns {Promise} a promise that resolves to the result of the insert query.
 */
export async function createOption(content) {
  try {
    if (!content) {
      throw new InputError('Content is required to create an option');
    }

    if (typeof content !== 'string') {
      throw new InputError('Content must be a string');
    }

    if (content.length < 3) {
      throw new InputError('Content must be at least 3 characters long');
    }

    return optionRepository.createOption(content);
    
  } catch (error) {
    throw new ErrorHandling(error.statusCode, `Failed to create option: ${error.message}`, 'Failed to create option');
  }
}

/**
 * @description Retrieves all options from the database.
 * @returns {Promise} a promise that resolves to the list of options.
 */
export async function getOptions(offset = 0, limit = 10) {
  try {
    return await optionRepository.getAllOptions(offset, limit);
  } catch (error) {
    throw new ErrorHandling(error.statusCode, `Failed to fetch options: ${error.message}`, 'Failed to fetch option');
  }
}

/**
 * @description Retrieves an option by its ID from the database.
 * @param {number} id 
 * @returns 
 */
export async function getOptionById(id) {
  try {
    if (!id) {
      throw new InputError('Option ID is required');
    }

    if (typeof id !== 'number') {
      throw new InputError('Option ID must be a number');
    }

    const option = await optionRepository.getOptionById(id);

    if (!option) {
      throw new InputError('Option not found');
    }

    return option;
  } catch (error) {
    throw new ErrorHandling(error.statusCode, `Failed to fetch option by ID: ${error.message}`, 'Failed to fetch option');
  }
}

export async function updateOption(id, content) {
  try {
    if (!id) {
      throw new InputError('Option ID is required');
    }

    if (!content) {
      throw new InputError('Content is required to update an option');
    }

    if (typeof content !== 'string') {
      throw new InputError('Content must be a string');
    }

    if (content.length < 3) {
      throw new InputError('Content must be at least 3 characters long');
    }

    return await optionRepository.updateOption(id, content);
  } catch (error) {
    throw new ErrorHandling(error.statusCode, `Failed to update option: ${error.message}`, 'Failed to update option');
  }
}

export async function deleteOption(id) {
  try {
    if (!id) {
      throw new InputError('Option ID is required');
    }
    
    if (typeof id !== 'number') {
      throw new InputError('Option ID must be a number');
    }

    return await optionRepository.deleteOption(id);
  } catch (error) {
    throw new ErrorHandling(error.statusCode, `Failed to delete option: ${error.message}`, 'Failed to delete option');
  }
}