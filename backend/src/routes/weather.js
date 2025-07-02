const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

/**
 * GET /api/weather
 * Get weather data by city name or coordinates
 * Query params: 
 *   - city: string (city name)
 *   - lat: number (latitude)
 *   - lon: number (longitude)
 */
router.get('/', weatherController.getWeather);

module.exports = router; 