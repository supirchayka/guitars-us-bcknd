const prisma = require('../config/prisma');

const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            guitar: true
          }
        },
        promoCode: true,
        customGuitars: {
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
        }
      }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        items: {
          include: {
            guitar: true
          }
        },
        promoCode: true,
        customGuitars: {
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
        }
      }
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update order status' });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus
};