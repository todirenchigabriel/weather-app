import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_API_URL || '/api'
    : '/api',
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 404:
          throw new Error(data.message || 'Location not found');
        case 429:
          throw new Error('Too many requests. Please try again later.');
        case 500:
          throw new Error(data.message || 'Server error. Please try again.');
        default:
          throw new Error(data.message || 'An error occurred');
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection.');
    } else {
      // Other error
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

// Weather API functions
export const weatherApi = {
  /**
   * Get weather data for a city
   * @param {string} city - City name
   * @returns {Promise} Weather data
   */
  getWeatherByCity: async (city) => {
    const response = await api.get('/weather', {
      params: { city }
    });
    return response.data;
  },

  /**
   * Get weather data by coordinates
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise} Weather data
   */
  getWeatherByCoords: async (lat, lon) => {
    const response = await api.get('/weather', {
      params: { lat, lon }
    });
    return response.data;
  },

  /**
   * Search for cities
   * @param {string} query - Search query
   * @param {number} limit - Number of results (default: 5)
   * @returns {Promise} Array of cities
   */
  searchCities: async (query, limit = 5) => {
    if (!query || query.trim().length < 2) {
      return { cities: [], count: 0, query: '' };
    }
    
    const response = await api.get('/cities', {
      params: { query: query.trim(), limit }
    });
    return response.data;
  }
};

// Geolocation utilities
export const geolocationApi = {
  /**
   * Get user's current position
   * @returns {Promise} Position object with lat/lon
   */
  getCurrentPosition: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('Location access denied by user'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information unavailable'));
              break;
            case error.TIMEOUT:
              reject(new Error('Location request timed out'));
              break;
            default:
              reject(new Error('An unknown error occurred'));
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000 // 10 minutes
        }
      );
    });
  }
};

export default api; 