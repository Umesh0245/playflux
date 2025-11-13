#!/bin/bash

# Seed the database with initial products
echo "🌱 Seeding database with products..."

cd backend
npm run seed

echo ""
echo "✅ Database seeded successfully!"
