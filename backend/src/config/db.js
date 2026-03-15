const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: { rejectUnauthorized: true }, // required by PlanetScale
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Execute a parameterized SQL query.
 * @param {string} sql - SQL statement with ? placeholders
 * @param {Array}  params - Bound parameter values
 * @returns {Promise<Array>} rows from the result set
 */
async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = { pool, query };
