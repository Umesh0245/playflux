# Vault Prime Shop - E-Commerce Gaming Store

A full-stack e-commerce platform for gaming peripherals and accessories built with React, TypeScript, Node.js, and Express.

## 🚀 Features

- **Modern React Frontend** - Built with React 18, TypeScript, and Vite
- **Beautiful UI** - Shadcn/ui components with Tailwind CSS
- **RESTful API Backend** - Express.js with TypeScript
- **State Management** - Zustand for cart and user state
- **Authentication** - JWT-based auth system
- **Product Catalog** - Browse keyboards, mice, headsets, monitors, and more
- **Shopping Cart** - Full cart functionality with persistence
- **User Profiles** - Order history and profile management
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
playflux/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and stores
│   │   └── assets/        # Images and static files
│   └── package.json
├── backend/           # Express.js backend API
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── config/        # Configuration files
│   └── package.json
└── scripts/           # Build and run scripts
```

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or bun
- MongoDB (local or MongoDB Atlas)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <YOUR_GIT_URL>
   cd playflux
   ```

2. **One-Command Setup & Run** ⭐

   ```bash
   chmod +x scripts/run.sh
   ./scripts/run.sh
   ```

   This script will:

   - Check prerequisites
   - Install all dependencies
   - Set up environment files
   - Optionally seed the database
   - Start both frontend and backend servers

### Manual Setup

If you prefer manual setup:

1. **Install dependencies**

   ```bash
   # Frontend
   npm install

   # Backend
   cd backend
   npm install
   cp .env.example .env  # Update with your config
   cd ..
   ```

2. **Start MongoDB**

   ```bash
   # macOS with Homebrew
   brew services start mongodb-community

   # Or use MongoDB Atlas (cloud)
   ```

3. **Seed the database**

   ```bash
   cd backend
   npm run seed
   cd ..
   ```

4. **Start development servers**

   ```bash
   # Start both frontend and backend
   ./scripts/dev.sh

   # Or start individually:
   ./scripts/dev-frontend.sh  # Frontend only (port 5173)
   ./scripts/dev-backend.sh   # Backend only (port 3000)
   ```

## 📦 Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

## 🔧 Technologies Used

### Frontend

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **Zustand** - State management
- **React Router** - Routing
- **TanStack Query** - Data fetching

### Backend

- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB/Mongoose** - Database (optional)
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item

### Orders

- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

## 📝 Environment Variables

Create `.env` files in both frontend and backend directories:

### Frontend `.env`

```env
VITE_API_URL=http://localhost:3000/api
```

### Backend `.env`

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
MONGODB_URI=mongodb://localhost:27017/vault-prime-shop
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
