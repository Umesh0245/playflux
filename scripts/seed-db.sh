#!/bin/bash

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Seed the database with initial products
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🌱 Seeding MongoDB Database${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}This will clear existing products and seed fresh data...${NC}"
echo ""

cd backend
npm run seed

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Database seeded successfully!${NC}"
    echo -e "${YELLOW}You can now view products in MongoDB Atlas${NC}"
else
    echo ""
    echo -e "${RED}❌ Database seeding failed!${NC}"
    exit 1
fi
