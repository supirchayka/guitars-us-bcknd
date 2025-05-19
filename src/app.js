require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const prisma = require('./config/prisma');

const app = express();

const guitarRoutes = require('./routes/guitarRoutes');
const orderRoutes = require('./routes/orderRoutes');
const promoCodeRoutes = require('./routes/promoCodeRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes')
const customGuitarRoutes = require('./routes/customGuitarRoutes');

// Подключение к базе данных
prisma.$connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Database connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Проверка работы сервера
app.get('/', (req, res) => {
  res.send('Guitar Shop API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/guitars', guitarRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/promo-codes', promoCodeRoutes);
app.use('/api/custom-guitars', customGuitarRoutes);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;