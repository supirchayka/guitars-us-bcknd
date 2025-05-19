const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const {
  getAllPromoCodes,
  createPromoCode,
  updatePromoCode,
  deletePromoCode
} = require('../controllers/promoCodeController');

router.get('/', isAdmin, getAllPromoCodes);
router.post('/', isAdmin, createPromoCode);
router.put('/:id', isAdmin, updatePromoCode);
router.delete('/:id', isAdmin, deletePromoCode);

module.exports = router;