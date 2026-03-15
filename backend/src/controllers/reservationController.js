const { validationResult } = require('express-validator');
const Reservation = require('../models/Reservation');

const getAll = async (req, res, next) => {
  try {
    const reservations =
      req.user.role === 'admin'
        ? await Reservation.findAll()
        : await Reservation.findByUser(req.user.id);
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    if (req.user.role !== 'admin' && reservation.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(reservation);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { restaurantId, reservationDate, reservationTime, partySize, notes } = req.body;
    const reservation = await Reservation.create({
      userId: req.user.id,
      restaurantId,
      reservationDate,
      reservationTime,
      partySize,
      notes,
    });
    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const existing = await Reservation.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Reservation not found' });
    if (req.user.role !== 'admin' && existing.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updated = await Reservation.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const existing = await Reservation.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Reservation not found' });
    if (req.user.role !== 'admin' && existing.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Reservation.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, create, update, remove };
