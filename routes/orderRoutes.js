const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

// All order routes require authentication
router.use(protect);

router.route('/').get(protect, getMyOrders).post(protect, placeOrder);
router.route('/:id').get(protect, getOrder);

// Admin-only: update order status
router.put('/:id', protect, admin, updateOrderStatus);

module.exports = router;
