const express = require('express');
const router = express.Router();
const controller = require('../controllers/customGuitarController');
//const { createCustomGuitarValidation } = require('../middleware/validation/customGuitarValidation');

// Публичные маршруты
router.get('/characteristics', controller.getGuitarCharacteristics);
router.post('/', controller.createCustomGuitar);


// Защищенные маршруты
/*
const { protect, isAdmin } = require('../middleware/auth');
router.get('/user/:email', protect, isAdmin, controller.getUserCustomGuitars);
router.get('/', protect, isAdmin, controller.getAllCustomGuitars);
router.get('/:id', protect, isAdmin, controller.getCustomGuitarById);
router.put('/:id/status', protect, isAdmin, controller.updateGuitarStatus);
*/
module.exports = router;
