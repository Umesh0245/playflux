# PlayFlux - Premium Gaming Peripherals E-Commerce

A modern, full-stack e-commerce platform for gaming peripherals built with React, TypeScript, Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation & Running

1. **Clone the repository**

```bash
git clone <repository-url>
cd playflux
```

2. **Setup environment variables**

```bash
# Copy the example env file
cp backend/.env.example backend/.env
# Edit backend/.env and add your MongoDB connection string
```

3. **Start the application** (one command does it all!)

```bash
./start-all.sh
```

This will:

- Install all dependencies (if needed)
- **Seed the MongoDB database with products** 🌱
- Start the backend server on http://localhost:3000
- Start the frontend on http://localhost:5174

### Manual Database Seeding

If you need to reseed the database separately:

```bash
./scripts/seed-db.sh
```

## 📦 Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **shadcn/ui** - UI components

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database (Atlas cloud)
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🗄️ Database

The application uses **MongoDB Atlas** for data storage. See [DATABASE.md](./DATABASE.md) for detailed information about:

- Connection setup
- Seeding data
- Viewing data in Atlas
- Schema documentation
- Troubleshooting

## 🎮 Features

- **Product Catalog**: Browse gaming keyboards, mice, headsets, monitors, controllers, and chairs
- **Product Details**: View detailed information with image galleries
- **Shopping Cart**: Add/remove items, quantity management
- **User Authentication**: Sign up, login, profile management
- **Order Management**: Place orders, view order history
- **Multiple Addresses**: Save and manage multiple shipping addresses
- **Category Filtering**: Filter products by category
- **Search**: Search products by name and category
- **Responsive Design**: Works on desktop, tablet, and mobile

## 📁 Project Structure

```
playflux/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities, stores, mock data
│   │   └── hooks/        # Custom React hooks
│   └── public/           # Static assets
│
├── backend/              # Express backend API
│   ├── src/
│   │   ├── config/       # Database & config
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   └── scripts/      # Database seeding
│   └── .env              # Environment variables
│
└── scripts/              # Utility scripts
    ├── seed-db.sh       # Database seeding
    └── setup.sh         # Initial setup
```

## 🔧 Available Scripts

### Root Directory

- `./start-all.sh` - Start both frontend and backend (with auto-seeding)
- `./scripts/seed-db.sh` - Seed database with products

### Backend

```bash
cd backend
npm run dev      # Start backend in development mode
npm run build    # Build for production
npm run start    # Start production server
npm run seed     # Seed database
```

### Frontend

```bash
cd frontend
npm run dev      # Start frontend dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🌐 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove from cart

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID

## 🎨 Design Features

- **Neural Network Logo**: Modern dendrite-style logo inspired by AI/tech aesthetic
- **Professional UI**: Clean black & white design with card-based layouts
- **Image Galleries**: Multiple product images with thumbnail navigation
- **Smooth Animations**: Hover effects and transitions throughout
- **Mobile Responsive**: Optimized for all screen sizes

## 🔒 Environment Variables

Create `backend/.env` with:

```env
PORT=3000
NODE_ENV=development

# MongoDB Atlas connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vault-prime-shop

# JWT configuration
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5174
```

## 📝 Notes

- Products are automatically seeded when starting with `start-all.sh`
- Frontend uses Unsplash for product images
- Backend validates all inputs with express-validator
- Passwords are hashed with bcryptjs
- JWT tokens are stored in localStorage on frontend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning and development.

## 📧 Support

For issues or questions, please check [DATABASE.md](./DATABASE.md) for common troubleshooting steps.
