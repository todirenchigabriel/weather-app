import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  useToast,
  Container,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CitySearch from '../components/CitySearch';
import WeatherDisplay from '../components/WeatherDisplay';
import LocationButton from '../components/LocationButton';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { weatherApi, geolocationApi } from '../services/api';

const WeatherPage = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [currentCoordinates, setCurrentCoordinates] = useState(null);
  const location = useLocation();
  const toast = useToast();

  // Initialize with data from navigation state
  useEffect(() => {
    if (location.state?.city) {
      setCurrentCity(location.state.city);
      setCurrentCoordinates(null);
    } else if (location.state?.coordinates) {
      setCurrentCoordinates(location.state.coordinates);
      setCurrentCity(null);
    }
  }, [location.state]);

  // Weather query
  const {
    data: weatherData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['weather', currentCity, currentCoordinates],
    queryFn: async () => {
      if (currentCity) {
        return weatherApi.getWeatherByCity(currentCity.displayName || currentCity.name || currentCity);
      } else if (currentCoordinates) {
        return weatherApi.getWeatherByCoords(currentCoordinates.lat, currentCoordinates.lon);
      }
      return null;
    },
    enabled: !!(currentCity || currentCoordinates),
    retry: 1,
  });

  // Handle city selection from search
  const handleCitySelect = (city) => {
    setCurrentCity(city);
    setCurrentCoordinates(null);
  };

  // Handle location detection
  const handleLocationWeather = async () => {
    try {
      const position = await geolocationApi.getCurrentPosition();
      setCurrentCoordinates(position);
      setCurrentCity(null);
      
      toast({
        title: 'Location Detected',
        description: 'Getting weather for your current location...',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Location Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle retry
  const handleRetry = () => {
    refetch();
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header with Search */}
        <Box>
          <Flex align="center" mb={6}>
            <Heading size="xl" color="weather.700">
              Weather Information
            </Heading>
            <Spacer />
            <LocationButton onLocationDetected={handleLocationWeather} />
          </Flex>
          
          {/* City Search */}
          <CitySearch
            onCitySelect={handleCitySelect}
            placeholder="Search for a city..."
            size="md"
          />
        </Box>

        {/* Weather Content */}
        <Box>
          {isLoading && (
            <LoadingSpinner 
              message={
                currentCity 
                  ? `Getting weather for ${currentCity.displayName || currentCity.name || currentCity}...`
                  : 'Getting weather for your location...'
              }
            />
          )}

          {error && (
            <ErrorAlert
              title="Weather Data Error"
              message={error.message}
              onRetry={handleRetry}
            />
          )}

          {weatherData && !isLoading && !error && (
            <WeatherDisplay weatherData={weatherData} />
          )}

          {!weatherData && !isLoading && !error && !currentCity && !currentCoordinates && (
            <Box textAlign="center" py={12} color="gray.500">
              <Heading size="md" mb={4}>
                No location selected
              </Heading>
              <Box>
                Search for a city above or use your current location to get weather information.
              </Box>
            </Box>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default WeatherPage; 