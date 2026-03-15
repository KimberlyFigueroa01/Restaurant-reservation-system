const { Router } = require('express');
const { body } = require('express-validator');
const { getAll, getOne, create, update, remove } = require('../controllers/restaurantController');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = Router();

// Public routes
router.get('/', getAll);
router.get('/:id', getOne);

// Admin-only routes
router.post(
  '/',
  authenticate,
  requireAdmin,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('capacity').optional().isInt({ min: 1 }),
  ],
  create
);

router.put(
  '/:id',
  authenticate,
  requireAdmin,
  [
    body('name').optional().trim().notEmpty(),
    body('capacity').optional().isInt({ min: 1 }),
  ],
  update
);

router.delete('/:id', authenticate, requireAdmin, remove);

module.exports = router;
