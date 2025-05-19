const { body } = require('express-validator');

exports.createCustomGuitarValidation = [
  body('customerEmail')
    .isEmail()
    .withMessage('Пожалуйста, укажите корректный email')
    .normalizeEmail(),
  
  body('customerName')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Имя должно содержать минимум 2 символа'),
    
  body('customerPhone')
    .optional()
    .isMobilePhone()
    .withMessage('Укажите корректный номер телефона'),
    
  body('selectedOptions')
    .isArray({ min: 1 })
    .withMessage('Выберите хотя бы одну опцию'),
    
  body('selectedOptions.*')
    .isInt()
    .withMessage('ID опции должно быть числом'),
    
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Комментарий не должен превышать 1000 символов')
];