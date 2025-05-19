const prisma = require('../config/prisma');

const getAllPromoCodes = async (req, res) => {
  try {
    const promoCodes = await prisma.promoCode.findMany();
    res.json(promoCodes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch promo codes' });
  }
};

const createPromoCode = async (req, res) => {
  const { code, description, discount, active, blogger } = req.body;
  try {
    const promoCode = await prisma.promoCode.create({
      data: { code, description, discount, active, blogger }
    });
    res.status(201).json(promoCode);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create promo code' });
  }
};

const updatePromoCode = async (req, res) => {
  const { id } = req.params;
  const { code, description, discount, active, blogger } = req.body;
  try {
    const promoCode = await prisma.promoCode.update({
      where: { id: parseInt(id) },
      data: { code, description, discount, active, blogger }
    });
    res.json(promoCode);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update promo code' });
  }
};

const deletePromoCode = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.promoCode.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete promo code' });
  }
};

module.exports = {
  getAllPromoCodes,
  createPromoCode,
  updatePromoCode,
  deletePromoCode
};