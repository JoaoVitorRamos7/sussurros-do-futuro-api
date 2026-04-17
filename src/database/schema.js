import {client} from "../features/option/pg-client.js";

const result = await client.query(`
DROP TABLE IF EXISTS options;
DROP TABLE IF EXISTS questions;

CREATE TABLE options (
  id SERIAL PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

console.log(result)
await client.end()