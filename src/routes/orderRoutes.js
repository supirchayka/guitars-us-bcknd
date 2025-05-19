const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const {
  getAllOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');

router.get('/', isAdmin, getAllOrders);
router.get('/:id', isAdmin, getOrderById);
router.put('/:id/status', isAdmin, updateOrderStatus);

module.exports = router;