const { Router } = require('express');
const { body } = require('express-validator');
const { getAll, getOne, create, update, remove } = require('../controllers/reservationController');
const { authenticate } = require('../middleware/auth');

const router = Router();

// All reservation routes require authentication
router.use(authenticate);

router.get('/', getAll);
router.get('/:id', getOne);

router.post(
  '/',
  [
    body('restaurantId').isInt({ gt: 0 }).withMessage('Valid restaurant ID is required'),
    body('reservationDate').isDate().withMessage('Valid date is required (YYYY-MM-DD)'),
    body('reservationTime')
      .matches(/^\d{2}:\d{2}(:\d{2})?$/)
      .withMessage('Valid time is required (HH:MM)'),
    body('partySize').isInt({ min: 1 }).withMessage('Party size must be at least 1'),
  ],
  create
);

router.put(
  '/:id',
  [
    body('reservationDate').optional().isDate(),
    body('reservationTime')
      .optional()
      .matches(/^\d{2}:\d{2}(:\d{2})?$/),
    body('partySize').optional().isInt({ min: 1 }),
    body('status').optional().isIn(['pending', 'confirmed', 'cancelled']),
  ],
  update
);

router.delete('/:id', remove);

module.exports = router;
