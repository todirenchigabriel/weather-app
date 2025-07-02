import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useToast,
  Container,
  Icon,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from 'react-icons/wi';
import CitySearch from '../components/CitySearch';
import LocationButton from '../components/LocationButton';
import { useQuery } from '@tanstack/react-query';
import { weatherApi, geolocationApi } from '../services/api';

const HomePage = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  // Handle city selection from search
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    navigate('/weather', { state: { city } });
  };

  // Handle location detection
  const handleLocationWeather = async () => {
    try {
      const position = await geolocationApi.getCurrentPosition();
      navigate('/weather', { state: { coordinates: position } });
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

  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={12} align="center" textAlign="center">
        {/* Hero Section */}
        <VStack spacing={6}>
          <HStack spacing={4} justify="center">
            <Icon as={WiDaySunny} w={16} h={16} color="sunny.500" />
            <Icon as={WiCloudy} w={16} h={16} color="gray.500" />
            <Icon as={WiRain} w={16} h={16} color="rainy.500" />
            <Icon as={WiSnow} w={16} h={16} color="blue.400" />
          </HStack>
          
          <Heading size="2xl" color="weather.700">
            Welcome to Weather App
          </Heading>
          
          <Text fontSize="xl" color="gray.600" maxW="md">
            Get accurate weather information for any city worldwide. 
            Search for a city or use your current location to get started.
          </Text>
        </VStack>

        <Divider />

        {/* Search Section */}
        <VStack spacing={6} w="full">
          <Heading size="lg" color="gray.700">
            Find Weather Information
          </Heading>
          
          {/* City Search */}
          <Box w="full" maxW="md">
            <Text mb={4} color="gray.600">
              Search for a city:
            </Text>
            <CitySearch
              onCitySelect={handleCitySelect}
              placeholder="Enter city name (e.g., New York, London, Tokyo)"
              size="lg"
            />
          </Box>

          {/* Divider with OR */}
          <HStack w="full" maxW="md">
            <Divider />
            <Text px={4} color="gray.500" fontSize="sm">
              OR
            </Text>
            <Divider />
          </HStack>

          {/* Location Button */}
          <VStack spacing={2}>
            <Text color="gray.600">
              Use your current location:
            </Text>
            <LocationButton
              onLocationDetected={handleLocationWeather}
              size="lg"
            />
          </VStack>
        </VStack>

        {/* Features Section */}
        <VStack spacing={4} align="center" color="gray.600">
          <Heading size="md" color="gray.700">
            Features
          </Heading>
          <VStack spacing={2} align="start">
            <Text>🌡️ Current temperature and "feels like" temperature</Text>
            <Text>💧 Humidity and atmospheric pressure</Text>
            <Text>💨 Wind speed and direction</Text>
            <Text>🌅 Sunrise and sunset times</Text>
            <Text>🔍 Smart city search with autocomplete</Text>
            <Text>📍 Automatic location detection</Text>
          </VStack>
        </VStack>
      </VStack>
    </Container>
  );
};

export default HomePage; 