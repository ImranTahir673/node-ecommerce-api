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

router.route('/').get(getMyOrders).post(placeOrder);
router.route('/:id').get(getOrder);

// Admin-only: update order status
router.put('/:id', admin, updateOrderStatus);

module.exports = router;
