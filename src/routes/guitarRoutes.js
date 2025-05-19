const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const {
  getAllGuitars,
  getGuitarById,
  createGuitar,
  updateGuitar,
  deleteGuitar
} = require('../controllers/guitarController');

router.get('/', getAllGuitars);
router.get('/:id', getGuitarById);
router.post('/', isAdmin, createGuitar);
router.put('/:id', isAdmin, updateGuitar);
router.delete('/:id', isAdmin, deleteGuitar);

module.exports = router;