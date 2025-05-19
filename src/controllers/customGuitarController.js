const prisma = require('../config/prisma');

// Получение всех возможных характеристик для конструктора
const getGuitarCharacteristics = async (req, res) => {
  try {
    const characteristics = await prisma.characteristicType.findMany({
      include: {
        options: {
          select: {
            id: true,
            value: true,
            priceModifier: true
          }
        }
      }
    });
    
    res.json({
      success: true,
      data: characteristics.map(type => ({
        ...type,
        slug: type.name.toLowerCase().replace(/\s+/g, '_'),
        options: type.options.map(opt => ({
          ...opt,
          priceModifier: opt.priceModifier || 0
        }))
      }))
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to get characteristics' 
    });
  }
};

// Создание новой кастомной гитары
const createCustomGuitar = async (req, res) => {
  const { customerEmail, customerName, customerPhone, selectedOptions, notes } = req.body;

  try {
    // Валидация опций
    const options = await Promise.all(
      selectedOptions.map(async (optionId) => {
        const option = await prisma.characteristicOption.findUnique({
          where: { id: optionId }
        });
        if (!option) throw new Error(`Option ${optionId} not found`);
        return { optionId };
      })
    );

    // Расчет цены (можно вынести в отдельный сервис)
    const basePrice = 2000; // Базовая цена кастомной гитары
    const optionsModifiers = await prisma.characteristicOption.findMany({
      where: { id: { in: selectedOptions } },
      select: { priceModifier: true }
    });
    
    const totalPrice = optionsModifiers.reduce(
      (sum, opt) => sum + (opt.priceModifier || 0),
      basePrice
    );

    const customGuitar = await prisma.customGuitar.create({
      data: {
        customerEmail,
        customerName,
        customerPhone,
        price: totalPrice,
        notes,
        selectedOptions: {
          create: options
        }
      },
      include: {
        selectedOptions: {
          include: {
            option: {
              include: {
                type: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: customGuitar
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getGuitarCharacteristics,
  createCustomGuitar,
};

/*
{
  "success": true,
  "data": {
    "id": 42,
    "customerEmail": "john.doe@example.com",
    "customerName": "John Doe",
    "customerPhone": "+1234567890",
    "price": 2450.00,
    "status": "PENDING",
    "notes": "Хочу матовое покрытие...",
    "createdAt": "2023-07-20T14:30:00.000Z",
    "selectedOptions": [
      {
        "id": 101,
        "option": {
          "id": 1,
          "value": "Mahogany",
          "priceModifier": 200,
          "type": {
            "id": 1,
            "name": "Body Material"
          }
        }
      },
      {
        "id": 102,
        "option": {
          "id": 3,
          "value": "HH Configuration",
          "priceModifier": 0,
          "type": {
            "id": 2,
            "name": "Pickup Configuration"
          }
        }
      }
    ]
  }
}
*/