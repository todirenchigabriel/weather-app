const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

/**
 * GET /api/cities
 * Search for cities with autocomplete functionality
 * Query params:
 *   - query: string (search term)
 *   - limit: number (optional, default 5)
 */
router.get('/', cityController.searchCities);

module.exports = router; 