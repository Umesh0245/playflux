#!/bin/bash

# MySQL Setup Script for PlayFlux
# This script will help you set up MySQL database

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🔧 MySQL Setup for PlayFlux${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}MySQL is not installed. Installing...${NC}"
    echo ""
    
    # macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo -e "${BLUE}Installing MySQL via Homebrew...${NC}"
        brew install mysql
    # Linux
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo -e "${BLUE}Installing MySQL...${NC}"
        sudo apt-get update
        sudo apt-get install mysql-server -y
    fi
else
    echo -e "${GREEN}✅ MySQL is already installed${NC}"
fi

echo ""
echo -e "${BLUE}Starting MySQL service...${NC}"

# Start MySQL
if [[ "$OSTYPE" == "darwin"* ]]; then
    brew services start mysql
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo systemctl start mysql
fi

sleep 2
echo -e "${GREEN}✅ MySQL service started${NC}"
echo ""

# Create database
echo -e "${BLUE}Creating playflux database...${NC}"
mysql -u root -e "CREATE DATABASE IF NOT EXISTS playflux;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database 'playflux' created successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Database might already exist or you need to set MySQL root password${NC}"
    echo -e "${YELLOW}   If prompted, enter your MySQL root password${NC}"
    mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS playflux;"
fi

echo ""
echo -e "${BLUE}Installing backend dependencies...${NC}"
cd backend
npm install

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ MySQL Setup Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo ""
echo -e "1. Update ${BLUE}backend/.env${NC} if needed:"
echo -e "   DB_HOST=localhost"
echo -e "   DB_USER=root"
echo -e "   DB_PASSWORD=${YELLOW}(your MySQL password if set)${NC}"
echo -e "   DB_NAME=playflux"
echo ""
echo -e "2. Start the application:"
echo -e "   ${GREEN}./start-all.sh${NC}"
echo ""
echo -e "${YELLOW}💡 The database tables will be created automatically when you start the app!${NC}"
echo ""
