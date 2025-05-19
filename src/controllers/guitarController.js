const prisma = require('../config/prisma');

const getAllGuitars = async (req, res) => {
  try {
    const guitars = await prisma.guitar.findMany({
      include: {
        images: true,
        characteristics: {
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
    res.json(guitars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch guitars' });
  }
};

const getGuitarById = async (req, res) => {
  const { id } = req.params;
  try {
    const guitar = await prisma.guitar.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: true,
        characteristics: {
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
    if (!guitar) return res.status(404).json({ error: 'Guitar not found' });
    res.json(guitar);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch guitar' });
  }
};

const createGuitar = async (req, res) => {
  const { name, description, price, stock, images, characteristics } = req.body;
  try {
    const guitar = await prisma.guitar.create({
      data: {
        name,
        description,
        price,
        stock,
        images: {
          create: images
        },
        characteristics: {
          create: characteristics.map(char => ({
            option: {
              connect: { id: char.optionId }
            }
          }))
        }
      },
      include: {
        images: true,
        characteristics: true
      }
    });
    res.status(201).json(guitar);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create guitar' });
  }
};

const updateGuitar = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, images, characteristics } = req.body;
  try {
    await prisma.guitarImage.deleteMany({
      where: { guitarId: parseInt(id) }
    });
    await prisma.guitarCharacteristic.deleteMany({
      where: { guitarId: parseInt(id) }
    });

    const guitar = await prisma.guitar.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        stock,
        images: {
          create: images
        },
        characteristics: {
          create: characteristics.map(char => ({
            option: {
              connect: { id: char.optionId }
            }
          }))
        }
      },
      include: {
        images: true,
        characteristics: true
      }
    });
    res.json(guitar);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update guitar' });
  }
};

const deleteGuitar = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.guitar.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete guitar' });
  }
};

module.exports = {
  getAllGuitars,
  getGuitarById,
  createGuitar,
  updateGuitar,
  deleteGuitar
};