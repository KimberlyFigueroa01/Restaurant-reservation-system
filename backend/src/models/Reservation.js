const { query } = require('../config/db');

const Reservation = {
  async findAll() {
    return query(`
      SELECT r.*, u.name AS user_name, u.email AS user_email,
             res.name AS restaurant_name
      FROM reservations r
      JOIN users u       ON r.user_id       = u.id
      JOIN restaurants res ON r.restaurant_id = res.id
      ORDER BY r.reservation_date, r.reservation_time
    `);
  },

  async findById(id) {
    const rows = await query(`
      SELECT r.*, u.name AS user_name, u.email AS user_email,
             res.name AS restaurant_name
      FROM reservations r
      JOIN users u       ON r.user_id       = u.id
      JOIN restaurants res ON r.restaurant_id = res.id
      WHERE r.id = ?
    `, [id]);
    return rows[0] || null;
  },

  async findByUser(userId) {
    return query(`
      SELECT r.*, res.name AS restaurant_name
      FROM reservations r
      JOIN restaurants res ON r.restaurant_id = res.id
      WHERE r.user_id = ?
      ORDER BY r.reservation_date, r.reservation_time
    `, [userId]);
  },

  async create({ userId, restaurantId, reservationDate, reservationTime, partySize, notes }) {
    const result = await query(
      `INSERT INTO reservations
         (user_id, restaurant_id, reservation_date, reservation_time, party_size, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, restaurantId, reservationDate, reservationTime, partySize, notes || null]
    );
    return this.findById(result.insertId);
  },

  async update(id, fields) {
    const allowed = ['reservation_date', 'reservation_time', 'party_size', 'status', 'notes'];
    const updates = Object.entries(fields).filter(([k]) => allowed.includes(k));
    if (updates.length === 0) return null;

    const setClause = updates.map(([k]) => `${k} = ?`).join(', ');
    const values = [...updates.map(([, v]) => v), id];
    await query(`UPDATE reservations SET ${setClause} WHERE id = ?`, values);
    return this.findById(id);
  },

  async delete(id) {
    const result = await query('DELETE FROM reservations WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Reservation;
