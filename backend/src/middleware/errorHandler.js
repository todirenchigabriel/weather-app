/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err);

  // Default error response
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
  };

  // Handle specific error types
  if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
    error = {
      message: 'Unable to connect to weather service. Please try again later.',
      status: 503,
    };
  }

  // Handle axios errors
  if (err.response && err.response.data) {
    const { status, data } = err.response;
    
    if (status === 401) {
      error = {
        message: 'Invalid API key configuration',
        status: 500,
      };
    } else if (status === 404) {
      error = {
        message: 'Location not found. Please check the city name and try again.',
        status: 404,
      };
    } else if (status === 429) {
      error = {
        message: 'Weather service rate limit exceeded. Please try again later.',
        status: 429,
      };
    } else {
      error = {
        message: data.message || 'Weather service error',
        status: status,
      };
    }
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    error = {
      message: 'Invalid request parameters',
      status: 400,
      details: err.details,
    };
  }

  // Send error response
  res.status(error.status).json({
    error: true,
    message: error.message,
    ...(error.details && { details: error.details }),
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      originalError: err.message 
    }),
  });
};

module.exports = errorHandler; 