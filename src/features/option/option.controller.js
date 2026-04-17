import handleError from '../../shared/errors/error-response.js';
import InputError from '../../shared/errors/input-error.js';
import * as optionServices from './option.services.js';

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
export async function createOption(req, res) {
  try {
  
    const content = req.body?.content;
  
    await optionServices.createOption(content);
  
    res.status(201).send();
  } catch (error) {
    return handleError(error, res);
  }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
export async function getOptions(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 25;
    const offset = parseInt(req.query.offset) || 0;
    
    const options = await optionServices.getOptions(offset, limit);
    
    res.status(200).json(options);
    
  } catch (error) {
    return handleError(error, res);
  }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
export async function getOptionById(req, res) {
  try {
    const id = req.params?.id;

    if (!id) {
      throw new InputError('Option ID is required');
    }

    if (isNaN(Number(id))) {
      throw new InputError('Option ID must be a number');
    }


    const option = await optionServices.getOptionById(Number(id));
    res.status(200).json(option);
    
  } catch (error) {
    return handleError(error, res);
  }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
export async function updateOption(req, res) {
  try {
    const id = req.params?.id;
    const content = req.body?.content;
    
    const result = await optionServices.updateOption(Number(id), content);

    result.rowCount === 0
      ? res.status(404).json({ message: 'Option not found' })
      : res.status(200).json({ message: 'Option updated successfully' });
  } catch (error) {
    return handleError(error, res);
  }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
export async function deleteOption(req, res) {
  try {
    const id = req.params?.id;

    if (!id) {
      throw new InputError('Option ID is required');
    }

    if (isNaN(Number(id))) {
      throw new InputError('Option ID must be a number');
    }

    const result = await optionServices.deleteOption(Number(id));

    result.rowCount === 0
      ? res.status(404).json({ message: 'Option not found' })
      : res.status(200).json({ message: 'Option deleted successfully' });
  } catch (error) {
    return handleError(error, res);
  }
}