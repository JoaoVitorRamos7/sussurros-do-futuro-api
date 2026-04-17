import handleError from '../../shared/errors/error-response.js';
import InputError from '../../shared/errors/input-error.js';
import * as questionServices from './question.services.js';

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
export async function createQuestion(req, res) {
  try {
  
    const content = req.body?.content;
  
    await questionServices.createQuestion(content);
  
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
export async function getQuestions(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 25;
    const offset = parseInt(req.query.offset) || 0;
    
    const questions = await questionServices.getQuestions(offset, limit);
    
    res.status(200).json(questions);
    
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
export async function getQuestionById(req, res) {
  try {
    const id = req.params?.id;

    if (!id) {
      throw new InputError('Question ID is required');
    }

    if (isNaN(Number(id))) {
      throw new InputError('Question ID must be a number');
    }


    const question = await questionServices.getQuestionById(Number(id));
    res.status(200).json(question);
    
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
export async function updateQuestion(req, res) {
  try {
    const id = req.params?.id;
    const content = req.body?.content;
    
    const result = await questionServices.updateQuestion(Number(id), content);

    result.rowCount === 0
      ? res.status(404).json({ message: 'Question not found' })
      : res.status(200).json({ message: 'Question updated successfully' });
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
export async function deleteQuestion(req, res) {
  try {
    const id = req.params?.id;

    if (!id) {
      throw new InputError('Question ID is required');
    }

    if (isNaN(Number(id))) {
      throw new InputError('Question ID must be a number');
    }

    const result = await questionServices.deleteQuestion(Number(id));

    result.rowCount === 0
      ? res.status(404).json({ message: 'Question not found' })
      : res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    return handleError(error, res);
  }
}