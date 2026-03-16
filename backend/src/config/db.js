const mysql = require('mysql2/promise');

const rawHost = process.env.DATABASE_HOST || process.env.DB_HOST || '';
const normalizedHost = rawHost.replace(/^https?:\/\//i, '').replace(/\/+$/, '');

const pool = mysql.createPool({
  host: normalizedHost,
  port: Number(process.env.DATABASE_PORT || process.env.DB_PORT || 3306),
  user: process.env.DATABASE_USERNAME || process.env.DB_USERNAME,
  password: process.env.DATABASE_PASSWORD || process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME || process.env.DB_DATABASE,
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
