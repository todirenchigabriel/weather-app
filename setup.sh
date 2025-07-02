#!/bin/bash

# Weather App Setup Script
echo "🌤️  Weather App Setup"
echo "====================="
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed ($(node --version))"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm is installed ($(npm --version))"
echo

# Install dependencies if not already installed
echo "📦 Installing dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    cd frontend && npm install && cd ..
fi

echo "✅ Dependencies installed"
echo

# Check if .env file exists in backend
if [ ! -f "backend/.env" ]; then
    echo "🔑 Setting up environment variables..."
    echo
    echo "You need an OpenWeatherMap API key to use this application."
    echo "1. Go to https://openweathermap.org/api"
    echo "2. Sign up for a free account"
    echo "3. Get your API key from the API keys section"
    echo
    
    read -p "Enter your OpenWeatherMap API key: " api_key
    
    if [ -z "$api_key" ]; then
        echo "❌ API key is required. Please run this script again with your API key."
        exit 1
    fi
    
    # Create .env file
    cat > backend/.env << EOL
# OpenWeatherMap API Configuration
OPENWEATHER_API_KEY=$api_key

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS in production)
FRONTEND_URL=http://localhost:3000
EOL
    
    echo "✅ Environment variables configured"
else
    echo "✅ Environment variables already configured"
fi

echo
echo "🚀 Setup complete!"
echo
echo "To start the application:"
echo "  npm run dev    # Start both frontend and backend"
echo
echo "Or start them separately:"
echo "  npm run backend    # Start backend only (port 5000)"
echo "  npm run frontend   # Start frontend only (port 3000)"
echo
echo "Then open http://localhost:3000 in your browser"
echo
echo "Enjoy your weather app! 🌈" 