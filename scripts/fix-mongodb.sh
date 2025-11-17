#!/bin/bash

# Quick script to open MongoDB Atlas and show instructions

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🔧 MongoDB Atlas IP Whitelist Setup${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Your current IP address:${NC}"
curl -s ifconfig.me
echo ""
echo ""
echo -e "${YELLOW}Steps to whitelist your IP:${NC}"
echo ""
echo "1. Opening MongoDB Atlas in your browser..."
echo "2. Click 'Network Access' in the left sidebar (Security section)"
echo "3. Click 'Add IP Address' button"
echo "4. Click 'Allow Access from Anywhere'"
echo "5. This will add 0.0.0.0/0 (allows all IPs)"
echo "6. Click 'Confirm'"
echo "7. Wait 1-2 minutes for changes to take effect"
echo ""
echo -e "${GREEN}Then run:${NC} ./start-all.sh"
echo ""

# Open MongoDB Atlas
open "https://cloud.mongodb.com/v2#/org/673402aa2ec5e36f2c5f2a95/projects"

echo -e "${YELLOW}📖 For detailed instructions, see: MONGODB_SETUP.md${NC}"
