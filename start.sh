#!/bin/bash
# Medical AI Assistant - Quick Start Script

echo "🏥 Medical AI Assistant - Setup & Start"
echo "========================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node -v)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm found: $(npm -v)${NC}"

# Install root dependencies
echo -e "\n${YELLOW}📦 Installing root dependencies...${NC}"
npm install

# Install backend dependencies
echo -e "\n${YELLOW}📦 Installing backend dependencies...${NC}"
cd backend
npm install
cd ..

# Install frontend dependencies
echo -e "\n${YELLOW}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..

echo -e "\n${GREEN}✅ All dependencies installed!${NC}"

# Start the application
echo -e "\n${YELLOW}🚀 Starting application...${NC}"
echo -e "${GREEN}Frontend will be available at: http://localhost:5173${NC}"
echo -e "${GREEN}Backend API will be available at: http://localhost:5000/api${NC}"

npm run dev
