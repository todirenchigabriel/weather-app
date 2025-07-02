const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const weatherRoutes = require('./routes/weather');
const cityRoutes = require('./routes/cities');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    message: 'Weather API Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/weather', weatherRoutes);
app.use('/api/cities', cityRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🌤️  Weather API Server running on port ${PORT}`);
  console.log(`🔗  Health check: http://localhost:${PORT}/health`);
  console.log(`📊  Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Check for required environment variables
  if (!process.env.OPENWEATHER_API_KEY) {
    console.warn('⚠️  Warning: OPENWEATHER_API_KEY not found in environment variables');
  }
});

module.exports = app; 