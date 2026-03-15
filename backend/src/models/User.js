const { query } = require('../config/db');

const User = {
  async findAll() {
    return query('SELECT id, name, email, role, created_at FROM users ORDER BY name');
  },

  async findById(id) {
    const rows = await query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async findByEmail(email) {
    const rows = await query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async create({ name, email, password, role = 'customer' }) {
    const result = await query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );
    return this.findById(result.insertId);
  },

  async update(id, fields) {
    const allowed = ['name', 'email', 'password', 'role'];
    const updates = Object.entries(fields).filter(([k]) => allowed.includes(k));
    if (updates.length === 0) return null;

    const setClause = updates.map(([k]) => `${k} = ?`).join(', ');
    const values = [...updates.map(([, v]) => v), id];
    await query(`UPDATE users SET ${setClause} WHERE id = ?`, values);
    return this.findById(id);
  },

  async delete(id) {
    const result = await query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = User;
