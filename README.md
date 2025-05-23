# Guitar Shop API

API для заказа кастомных электрогитар

## Технологии
- Node.js
- Express
- Prisma
- MySQL

## Установка
1. `npm install`
2. Создайте `.env` файл (см. `.env.example`)
3. `npx prisma migrate dev`

## API Endpoints
Base URL:
All API routes are prefixed with /api, except for the root endpoint.

Root:
GET / - Check if the API is running. Responds with "Guitar Shop API is running"

Authentication:
POST /api/auth/register - Register a new user
POST /api/auth/login - Login a user
GET /api/auth/me - Get current user information (requires authentication)

Users (Admin only):
GET /api/users - Retrieve a list of all users
GET /api/users/:id - Retrieve a user by their ID
POST /api/users - Create a new user
PUT /api/users/:id - Update an existing user
DELETE /api/users/:id - Delete a user

Guitars:
GET /api/guitars - Retrieve a list of all guitars
GET /api/guitars/:id - Retrieve a guitar by its ID
POST /api/guitars - Create a new guitar (admin only)
PUT /api/guitars/:id - Update an existing guitar (admin only)
DELETE /api/guitars/:id - Delete a guitar (admin only)

Orders (Admin only):
GET /api/orders - Retrieve a list of all orders
GET /api/orders/:id - Retrieve an order by its ID
PUT /api/orders/:id/status - Update the status of an order

Promo Codes (Admin only):
GET /api/promo-codes - Retrieve a list of all promo codes
POST /api/promo-codes - Create a new promo code
PUT /api/promo-codes/:id - Update an existing promo code
DELETE /api/promo-codes/:id - Delete a promo code

Custom Guitars:
GET /api/custom-guitars/characteristics - Retrieve guitar characteristics for custom orders
POST /api/custom-guitars - Create a custom guitar order