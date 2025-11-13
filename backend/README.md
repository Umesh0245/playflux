# Vault Prime Shop - Backend API

RESTful API backend for the Vault Prime Shop e-commerce platform.

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   └── database.ts   # MongoDB connection
│   ├── controllers/      # Route controllers
│   │   ├── auth.controller.ts
│   │   ├── cart.controller.ts
│   │   ├── order.controller.ts
│   │   ├── product.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/       # Custom middleware
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/          # Mongoose models
│   │   ├── cart.model.ts
│   │   ├── order.model.ts
│   │   ├── product.model.ts
│   │   └── user.model.ts
│   ├── routes/          # API routes
│   │   ├── auth.routes.ts
│   │   ├── cart.routes.ts
│   │   ├── order.routes.ts
│   │   ├── product.routes.ts
│   │   └── user.routes.ts
│   ├── scripts/         # Utility scripts
│   │   └── seed.ts      # Database seeding
│   └── server.ts        # Application entry point
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update with your values:

   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/vault-prime-shop
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

3. **Seed the database**

   ```bash
   npm run seed
   ```

4. **Start the server**

   ```bash
   # Development mode with hot reload
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint  | Description       | Auth Required |
| ------ | --------- | ----------------- | ------------- |
| POST   | `/signup` | Register new user | No            |
| POST   | `/login`  | Login user        | No            |
| GET    | `/me`     | Get current user  | Yes           |

### Products (`/api/products`)

| Method | Endpoint              | Description              | Auth Required |
| ------ | --------------------- | ------------------------ | ------------- |
| GET    | `/`                   | Get all products         | No            |
| GET    | `/:id`                | Get single product       | No            |
| GET    | `/category/:category` | Get products by category | No            |
| POST   | `/`                   | Create product           | Yes (Admin)   |
| PUT    | `/:id`                | Update product           | Yes (Admin)   |
| DELETE | `/:id`                | Delete product           | Yes (Admin)   |

### Cart (`/api/cart`)

| Method | Endpoint      | Description      | Auth Required |
| ------ | ------------- | ---------------- | ------------- |
| GET    | `/`           | Get user cart    | Yes           |
| POST   | `/`           | Add item to cart | Yes           |
| PUT    | `/:productId` | Update cart item | Yes           |
| DELETE | `/:productId` | Remove from cart | Yes           |
| DELETE | `/`           | Clear cart       | Yes           |

### Orders (`/api/orders`)

| Method | Endpoint      | Description         | Auth Required |
| ------ | ------------- | ------------------- | ------------- |
| GET    | `/`           | Get user orders     | Yes           |
| GET    | `/:id`        | Get single order    | Yes           |
| POST   | `/`           | Create new order    | Yes           |
| PUT    | `/:id/status` | Update order status | Yes (Admin)   |

### Users (`/api/users`)

| Method | Endpoint   | Description      | Auth Required |
| ------ | ---------- | ---------------- | ------------- |
| GET    | `/profile` | Get user profile | Yes           |
| PUT    | `/profile` | Update profile   | Yes           |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

## 📝 Environment Variables

| Variable       | Description               | Default                 |
| -------------- | ------------------------- | ----------------------- |
| `PORT`         | Server port               | `3000`                  |
| `NODE_ENV`     | Environment               | `development`           |
| `MONGODB_URI`  | MongoDB connection string | -                       |
| `JWT_SECRET`   | JWT secret key            | -                       |
| `JWT_EXPIRE`   | JWT expiration time       | `7d`                    |
| `FRONTEND_URL` | Frontend URL for CORS     | `http://localhost:5173` |

## 🗄️ Database Models

### User

- name, email, password, avatar, role
- Methods: comparePassword()

### Product

- id, name, price, image, rating, category, description, features, inStock, stock

### Cart

- userId, items[]
- Items: productId, name, price, image, quantity

### Order

- userId, orderNumber, items[], total, status, shippingAddress, paymentMethod

## 🧪 Testing

```bash
# Test endpoints with curl
curl http://localhost:3000/health
curl http://localhost:3000/api/products
```

## 📦 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## 🐛 Error Handling

The API uses a centralized error handling middleware that returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Stack trace (development only)"
}
```

## 📄 License

MIT
