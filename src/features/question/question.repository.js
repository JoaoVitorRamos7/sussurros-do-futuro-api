import ErrorHandling from '../../shared/errors/error-handling.js';
import {client, pool} from './pg-client.js';

/**
 * @description Creates a new question in the database.
 * @param {string} questionContent represent the value to save on database.
 * @returns {Promise} a promise that resolves to the result of the insert query.
 */
export async function createQuestion(questionContent) {
  try {
    return await client.query('INSERT INTO questions (content) VALUES ($1)', [questionContent]);
  } catch (error) {
    throw new ErrorHandling(500,'Error creating question:', error);
  }
}
/**
 * @description Retrieves all questions from the database.
 * @returns {Promise} a promise that resolves to the result of the select query
 */
export async function getAllQuestions(offset = 0, limit = 10) {
  try {
     const dataQuery = `
      SELECT id, content
      FROM questions
      ORDER BY id
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `
      SELECT COUNT(*) FROM questions
    `;

    const [dataResult, countResult] = await Promise.all([
      pool.query(dataQuery, [limit, offset]),
      pool.query(countQuery)
    ]);

    const results = dataResult.rows;
    const count = parseInt(countResult.rows[0].count);

    return {
      metadata: {
        resultset: {
          count,
          offset,
          limit
        }
      },
      results
    }

  } catch (error) {
    throw new ErrorHandling(500,'Error fetching questions:', error);
  }
}

/**
 * @description Retrieves an question from the database by its ID.
 * @param {number} questionId represent the id to filter by on the database
 * @returns {Promise} a promise that resolves to the result of the select query
 */
export async function getQuestionById(questionId) {
  try {
    const result = await client.query('SELECT * FROM questions WHERE id = $1', [questionId]);
    return result.rows[0];
  } catch (error) {
    throw new ErrorHandling(500,'Error fetching question by ID:', error);
    return null;
  }
}

/**
 * @description Updates an question in the database.
 * @param {number} questionId represent the id to filter by on the database
 * @param {string} newContent represent the new value to update on the database
 * @returns {Promise} a promise that resolves to the result of the update query
 */
export async function updateQuestion(questionId, newContent) {
  try {
    return await client.query('UPDATE questions SET content = $1 WHERE id = $2', [newContent, questionId]);
  } catch (error) {
    throw new ErrorHandling(500,'Error updating question:', error);
  }
}

/**
 * @description Deletes an question from the database.
 * @param {number} questionId represent the id to filter by on the database
 * @returns {Promise} a promise that resolves to the result of the delete query
 */
export async function deleteQuestion(questionId) {
  try {
    return await client.query('DELETE FROM questions WHERE id = $1', [questionId]);
  } catch (error) {
    throw new ErrorHandling(500,'Error deleting question:', error);
  }
}