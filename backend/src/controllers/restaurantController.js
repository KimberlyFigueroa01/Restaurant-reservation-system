const { validationResult } = require('express-validator');
const Restaurant = require('../models/Restaurant');

const getAll = async (_req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const existing = await Restaurant.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Restaurant not found' });

    const updated = await Restaurant.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const existing = await Restaurant.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Restaurant not found' });

    await Restaurant.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, create, update, remove };
