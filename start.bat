@echo off
REM Medical AI Assistant - Quick Start Script for Windows

echo.
echo 🏥 Medical AI Assistant - Setup ^& Start
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node -v

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm found: 
npm -v

REM Install root dependencies
echo.
echo 📦 Installing root dependencies...
call npm install

REM Install backend dependencies
echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install
cd ..

REM Install frontend dependencies
echo.
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo ✅ All dependencies installed!

REM Start the application
echo.
echo 🚀 Starting application...
echo Frontend will be available at: http://localhost:5173
echo Backend API will be available at: http://localhost:5000/api
echo.

call npm run dev
pause
