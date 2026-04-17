import ErrorHandling from '../../shared/errors/error-handling.js';
import {client, pool} from './pg-client.js';

/**
 * @description Creates a new option in the database.
 * @param {string} optionContent represent the value to save on database.
 * @returns {Promise} a promise that resolves to the result of the insert query.
 */
export async function createOption(optionContent) {
  try {
    return await client.query('INSERT INTO options (content) VALUES ($1)', [optionContent]);
  } catch (error) {
    throw new ErrorHandling(500,'Error creating option:', error);
  }
}
/**
 * @description Retrieves all options from the database.
 * @returns {Promise} a promise that resolves to the result of the select query
 */
export async function getAllOptions(offset = 0, limit = 10) {
  try {
     const dataQuery = `
      SELECT id, content
      FROM options
      ORDER BY id
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `
      SELECT COUNT(*) FROM options
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
    throw new ErrorHandling(500,'Error fetching options:', error);
  }
}

/**
 * @description Retrieves an option from the database by its ID.
 * @param {number} optionId represent the id to filter by on the database
 * @returns {Promise} a promise that resolves to the result of the select query
 */
export async function getOptionById(optionId) {
  try {
    const result = await client.query('SELECT * FROM options WHERE id = $1', [optionId]);
    return result.rows[0];
  } catch (error) {
    throw new ErrorHandling(500,'Error fetching option by ID:', error);
    return null;
  }
}

/**
 * @description Updates an option in the database.
 * @param {number} optionId represent the id to filter by on the database
 * @param {string} newContent represent the new value to update on the database
 * @returns {Promise} a promise that resolves to the result of the update query
 */
export async function updateOption(optionId, newContent) {
  try {
    return await client.query('UPDATE options SET content = $1 WHERE id = $2', [newContent, optionId]);
  } catch (error) {
    throw new ErrorHandling(500,'Error updating option:', error);
  }
}

/**
 * @description Deletes an option from the database.
 * @param {number} optionId represent the id to filter by on the database
 * @returns {Promise} a promise that resolves to the result of the delete query
 */
export async function deleteOption(optionId) {
  try {
    return await client.query('DELETE FROM options WHERE id = $1', [optionId]);
  } catch (error) {
    throw new ErrorHandling(500,'Error deleting option:', error);
  }
}