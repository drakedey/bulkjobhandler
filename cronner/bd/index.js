const { Client } = require('pg');

const client = new Client({
  user: `${process.env.DB_USER || 'worker'}`,
  host: `${process.env.DB_HOST || 'localhost'}`,
  database: `${process.env.DB_NAME || 'jobs'}`,
  password: `${process.env.DB_PASSWORD || '1234'}`,
  port: process.env.DB_PORT || 5432,
});
try {
  client.connect();
} catch (error) {
  console.log('here')
  console.error(error)
}

module.exports = client;
