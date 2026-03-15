const { query } = require('../config/db');

const Restaurant = {
  async findAll() {
    return query('SELECT * FROM restaurants ORDER BY name');
  },

  async findById(id) {
    const rows = await query('SELECT * FROM restaurants WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create({ name, address, phone, description, capacity }) {
    const result = await query(
      `INSERT INTO restaurants (name, address, phone, description, capacity)
       VALUES (?, ?, ?, ?, ?)`,
      [name, address, phone || null, description || null, capacity || 50]
    );
    return this.findById(result.insertId);
  },

  async update(id, fields) {
    const allowed = ['name', 'address', 'phone', 'description', 'capacity'];
    const updates = Object.entries(fields).filter(([k]) => allowed.includes(k));
    if (updates.length === 0) return null;

    const setClause = updates.map(([k]) => `${k} = ?`).join(', ');
    const values = [...updates.map(([, v]) => v), id];
    await query(`UPDATE restaurants SET ${setClause} WHERE id = ?`, values);
    return this.findById(id);
  },

  async delete(id) {
    const result = await query('DELETE FROM restaurants WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Restaurant;
