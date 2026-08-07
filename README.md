# Node.js E-Commerce Backend API

A production-style RESTful API for an e-commerce platform built with Node.js, Express.js, and MongoDB. Features include user authentication, product management, shopping cart, and order processing.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv

## Features

- 🔐 User authentication & authorization (JWT)
- 👤 Role-based access control (User / Admin)
- 📦 Product CRUD with filtering, search & pagination
- 🛒 Shopping cart management
- 📋 Order placement & tracking
- 🛡️ Auth middleware protecting private routes
- ⚠️ Global error handling
- 📁 Clean MVC folder structure

## Folder Structure

```
node-ecommerce-api/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   ├── authController.js        # Register, Login, Profile
│   ├── productController.js     # Product CRUD
│   ├── cartController.js        # Cart operations
│   └── orderController.js       # Order management
├── middleware/
│   ├── auth.js                  # JWT auth & admin middleware
│   └── error.js                 # Global error handler
├── models/
│   ├── User.js                  # User schema
│   ├── Product.js               # Product schema
│   ├── Cart.js                  # Cart schema
│   └── Order.js                 # Order schema
├── routes/
│   ├── authRoutes.js            # Auth endpoints
│   ├── productRoutes.js         # Product endpoints
│   ├── cartRoutes.js            # Cart endpoints
│   └── orderRoutes.js           # Order endpoints
├── utils/
│   └── generateToken.js         # JWT token helper
├── .env.example                 # Environment template
├── .gitignore
├── package.json
├── server.js                    # Entry point
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ImranTahir673/node-ecommerce-api.git
   cd node-ecommerce-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=30d
   ```

4. **Run the server**

   ```bash
   # Development (with auto-restart)
   npm run dev

   # Production
   npm start
   ```

   Server runs on `http://localhost:5000`

## API Routes

### Authentication

| Method | Endpoint             | Access | Description               |
| ------ | -------------------- | ------ | ------------------------- |
| POST   | `/api/auth/register` | Public | Register a new user       |
| POST   | `/api/auth/login`    | Public | Login & get token         |
| GET    | `/api/auth/profile`  | Private | Get logged-in user profile |

### Products

| Method | Endpoint             | Access        | Description                     |
| ------ | -------------------- | ------------- | ------------------------------- |
| GET    | `/api/products`      | Public        | Get all products (with filters) |
| GET    | `/api/products/:id`  | Public        | Get single product              |
| POST   | `/api/products`      | Private/Admin | Create a product                |
| PUT    | `/api/products/:id`  | Private/Admin | Update a product                |
| DELETE | `/api/products/:id`  | Private/Admin | Delete a product                |

**Query Parameters for GET `/api/products`:**
- `category` — Filter by category (electronics, clothing, books, home, sports, beauty, toys, other)
- `search` — Search by product name
- `minPrice` / `maxPrice` — Price range filter
- `sort` — Sort field (e.g., `price`, `-price`, `-createdAt`)
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10)

### Cart

| Method | Endpoint              | Access  | Description              |
| ------ | --------------------- | ------- | ------------------------ |
| GET    | `/api/cart`           | Private | Get user's cart           |
| POST   | `/api/cart`           | Private | Add item to cart          |
| PUT    | `/api/cart/:itemId`   | Private | Update item quantity      |
| DELETE | `/api/cart/:itemId`   | Private | Remove item from cart     |
| DELETE | `/api/cart`           | Private | Clear entire cart         |

### Orders

| Method | Endpoint            | Access        | Description            |
| ------ | ------------------- | ------------- | ---------------------- |
| POST   | `/api/orders`       | Private       | Place order (from cart) |
| GET    | `/api/orders`       | Private       | Get user's orders       |
| GET    | `/api/orders/:id`   | Private       | Get single order        |
| PUT    | `/api/orders/:id`   | Private/Admin | Update order status     |

## Request & Response Examples

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Create Product (Admin)

```bash
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "description": "Premium noise-cancelling wireless headphones",
  "price": 79.99,
  "category": "electronics",
  "stock": 50,
  "image": "https://example.com/headphones.jpg"
}
```

### Add to Cart

```bash
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "quantity": 2
}
```

### Place Order

```bash
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "address": "123 Main Street",
    "city": "Lahore",
    "postalCode": "54000",
    "country": "Pakistan"
  }
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Get the token from the `/api/auth/register` or `/api/auth/login` response.

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

| Status Code | Description            |
| ----------- | ---------------------- |
| 200         | Success                |
| 201         | Created                |
| 400         | Bad Request            |
| 401         | Unauthorized           |
| 403         | Forbidden (Admin only) |
| 404         | Not Found              |
| 500         | Server Error           |

## Author

**Imran Tahir**

## License

This project is licensed under the MIT License.
