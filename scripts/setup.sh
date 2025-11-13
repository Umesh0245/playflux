#!/bin/bash

# Vault Prime Shop - Complete Setup Script
echo "🚀 Setting up Vault Prime Shop..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js detected: $(node -v)"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update backend/.env with your configuration"
fi

echo "Installing backend dependencies..."
npm install

cd ..

# Setup Frontend (root is the frontend)
echo ""
echo "📦 Setting up Frontend..."
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Make sure MongoDB is running (or update backend/.env with your database URL)"
echo "2. Seed the database: cd backend && npm run seed"
echo "3. Start the development servers: ./scripts/dev.sh"
echo ""
echo "🌐 Frontend will run on: http://localhost:5174"
echo "🔌 Backend will run on: http://localhost:3000"
