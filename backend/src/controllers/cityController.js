const axios = require('axios');

const GEOCODING_BASE_URL = 'https://api.openweathermap.org/geo/1.0';
const API_KEY = process.env.OPENWEATHER_API_KEY;

/**
 * Search for cities with autocomplete functionality
 */
const searchCities = async (req, res, next) => {
  try {
    const { query, limit = 5 } = req.query;

    // Validate query parameter
    if (!query || query.trim().length < 2) {
      return res.status(400).json({
        error: true,
        message: 'Query must be at least 2 characters long'
      });
    }

    if (!API_KEY) {
      return res.status(500).json({
        error: true,
        message: 'Weather service configuration error'
      });
    }

    // Validate limit parameter
    const searchLimit = Math.min(Math.max(parseInt(limit) || 5, 1), 10);

    // Search for cities using OpenWeatherMap Geocoding API
    const geocodingUrl = `${GEOCODING_BASE_URL}/direct`;
    const params = {
      q: query.trim(),
      limit: searchLimit,
      appid: API_KEY
    };

    const response = await axios.get(geocodingUrl, { params });
    const cities = response.data;

    // Format city data
    const formattedCities = cities.map(city => ({
      name: city.name,
      country: city.country,
      state: city.state || null,
      coordinates: {
        lat: city.lat,
        lon: city.lon
      },
      displayName: city.state 
        ? `${city.name}, ${city.state}, ${city.country}`
        : `${city.name}, ${city.country}`
    }));

    // Remove duplicates based on display name
    const uniqueCities = formattedCities.filter((city, index, self) =>
      index === self.findIndex(c => c.displayName === city.displayName)
    );

    res.json({
      cities: uniqueCities,
      count: uniqueCities.length,
      query: query.trim()
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchCities
}; 