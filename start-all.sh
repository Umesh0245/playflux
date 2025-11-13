#!/bin/bash

# Vault Prime Shop - Development Script
# Single script to run both frontend and backend in development mode

set -e

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🚀 Vault Prime Shop - Development Mode${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}📍 Frontend:${NC} http://localhost:5174"
echo -e "${YELLOW}📍 Backend:${NC}  http://localhost:3000"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping servers...${NC}"
    pkill -f "vite|tsx watch" 2>/dev/null || true
    echo -e "${GREEN}✅ Servers stopped${NC}"
    exit 0
}

# Trap CTRL+C and call cleanup
trap cleanup INT TERM

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if node_modules exist
if [ ! -d "backend/node_modules" ] || [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Dependencies not installed. Running setup...${NC}"
    echo ""
    
    # Install backend dependencies
    echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
    (cd backend && npm install)
    
    # Install frontend dependencies
    echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
    (cd frontend && npm install)
    
    echo ""
    echo -e "${GREEN}✅ Dependencies installed${NC}"
    echo ""
fi

# Start backend server in background
echo -e "${BLUE}🔧 Starting backend server...${NC}"
(cd backend && npm run dev > /dev/null 2>&1) &
BACKEND_PID=$!

# Wait a moment for backend to initialize
sleep 2

# Start frontend server in background
echo -e "${BLUE}🎨 Starting frontend server...${NC}"
(cd frontend && npm run dev) &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}✅ Servers are running!${NC}"
echo ""
echo -e "${YELLOW}Press CTRL+C to stop both servers${NC}"
echo ""

# Wait for processes
wait $FRONTEND_PID $BACKEND_PID
