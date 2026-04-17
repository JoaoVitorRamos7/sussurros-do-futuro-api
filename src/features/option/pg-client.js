import pg, { Pool } from 'pg'
const { Client } = pg
const connectionString = 'postgresql://myuser:mypassword@localhost:5432/mydb'
 
export const client = new Client({
  connectionString,
})

export const pool = new Pool({
  connectionString,
})

client.connect();

client.on('error', (err) => {
  throw new Error('something bad has happened!', err.stack)
})