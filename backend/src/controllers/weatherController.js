const axios = require('axios');

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.OPENWEATHER_API_KEY;

/**
 * Get weather data by city name or coordinates
 */
const getWeather = async (req, res, next) => {
  try {
    const { city, lat, lon } = req.query;

    // Validate required parameters
    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        error: true,
        message: 'Please provide either a city name or both latitude and longitude'
      });
    }

    if (!API_KEY) {
      return res.status(500).json({
        error: true,
        message: 'Weather service configuration error'
      });
    }

    let weatherUrl = `${OPENWEATHER_BASE_URL}/weather`;
    const params = {
      appid: API_KEY,
      units: 'metric' // Use Celsius
    };

    // Build query based on input type
    if (city) {
      params.q = city;
    } else {
      params.lat = parseFloat(lat);
      params.lon = parseFloat(lon);
      
      // Validate coordinates
      if (isNaN(params.lat) || isNaN(params.lon)) {
        return res.status(400).json({
          error: true,
          message: 'Invalid latitude or longitude values'
        });
      }
      
      if (params.lat < -90 || params.lat > 90 || params.lon < -180 || params.lon > 180) {
        return res.status(400).json({
          error: true,
          message: 'Latitude must be between -90 and 90, longitude must be between -180 and 180'
        });
      }
    }

    // Fetch weather data
    const response = await axios.get(weatherUrl, { params });
    const weatherData = response.data;

    // Format and return weather data
    const formattedWeather = {
      location: {
        name: weatherData.name,
        country: weatherData.sys.country,
        coordinates: {
          lat: weatherData.coord.lat,
          lon: weatherData.coord.lon
        }
      },
      current: {
        temperature: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        windSpeed: weatherData.wind.speed,
        windDirection: weatherData.wind.deg,
        visibility: weatherData.visibility,
        uvIndex: null // Not available in free tier
      },
      weather: {
        main: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon
      },
      sun: {
        sunrise: new Date(weatherData.sys.sunrise * 1000).toISOString(),
        sunset: new Date(weatherData.sys.sunset * 1000).toISOString()
      },
      timestamp: new Date().toISOString(),
      source: 'OpenWeatherMap'
    };

    res.json(formattedWeather);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWeather
}; 