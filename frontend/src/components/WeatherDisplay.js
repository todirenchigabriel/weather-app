import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Grid,
  GridItem,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import WeatherIcon from './WeatherIcon';

const WeatherDisplay = ({ weatherData }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const statBg = useColorModeValue('gray.50', 'gray.700');

  if (!weatherData) return null;

  const {
    location,
    current,
    weather,
    sun,
    timestamp,
  } = weatherData;

  // Format time
  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Format date
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get wind direction
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Main Weather Card */}
      <Card bg={cardBg} shadow="xl">
        <CardBody>
          <VStack spacing={6}>
            {/* Location and Date */}
            <VStack spacing={2} textAlign="center">
              <Heading size="lg" color="weather.700">
                {location.name}
                {location.country && (
                  <Badge ml={2} colorScheme="weather" variant="subtle">
                    {location.country}
                  </Badge>
                )}
              </Heading>
              <Text color="gray.600" fontSize="sm">
                {formatDate(timestamp)}
              </Text>
              {location.coordinates && (
                <Text color="gray.500" fontSize="xs">
                  {location.coordinates.lat.toFixed(2)}°, {location.coordinates.lon.toFixed(2)}°
                </Text>
              )}
            </VStack>

            <Divider />

            {/* Current Weather */}
            <HStack spacing={8} justify="center" align="center">
              <VStack spacing={2}>
                <WeatherIcon 
                  condition={weather.main}
                  icon={weather.icon}
                  size={80}
                />
                <Text 
                  textAlign="center" 
                  fontSize="sm" 
                  color="gray.600"
                  textTransform="capitalize"
                >
                  {weather.description}
                </Text>
              </VStack>
              
              <VStack spacing={1} align="center">
                <Heading size="3xl" color="weather.600">
                  {current.temperature}°C
                </Heading>
                <Text color="gray.600" fontSize="md">
                  Feels like {current.feelsLike}°C
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Weather Details Grid */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
        <GridItem>
          <Card bg={statBg} h="full">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Humidity</StatLabel>
                <StatNumber color="rainy.600">{current.humidity}%</StatNumber>
                <StatHelpText>
                  {current.humidity > 70 ? 'High' : current.humidity > 40 ? 'Normal' : 'Low'}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={statBg} h="full">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Wind</StatLabel>
                <StatNumber color="weather.600">{current.windSpeed} m/s</StatNumber>
                <StatHelpText>
                  {getWindDirection(current.windDirection)} ({current.windDirection}°)
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={statBg} h="full">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Pressure</StatLabel>
                <StatNumber color="gray.700">{current.pressure} hPa</StatNumber>
                <StatHelpText>
                  {current.pressure > 1013 ? 'High' : current.pressure > 1000 ? 'Normal' : 'Low'}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={statBg} h="full">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Visibility</StatLabel>
                <StatNumber color="gray.700">
                  {current.visibility ? `${(current.visibility / 1000).toFixed(1)} km` : 'N/A'}
                </StatNumber>
                <StatHelpText>
                  {current.visibility > 10000 ? 'Excellent' : 
                   current.visibility > 5000 ? 'Good' : 'Limited'}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Sun Times */}
      {sun && (
        <Card bg={cardBg}>
          <CardBody>
            <Heading size="md" mb={4} color="sunny.600">
              ☀️ Sun Times
            </Heading>
            <HStack justify="space-around">
              <VStack>
                <Text color="gray.600" fontSize="sm">
                  Sunrise
                </Text>
                <Text fontWeight="bold" color="sunny.600">
                  {formatTime(sun.sunrise)}
                </Text>
              </VStack>
              <Divider orientation="vertical" h="50px" />
              <VStack>
                <Text color="gray.600" fontSize="sm">
                  Sunset
                </Text>
                <Text fontWeight="bold" color="sunny.600">
                  {formatTime(sun.sunset)}
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      )}

      {/* Data Source */}
      <Text textAlign="center" fontSize="xs" color="gray.500">
        Data updated: {formatTime(timestamp)} • Source: {weatherData.source}
      </Text>
    </VStack>
  );
};

export default WeatherDisplay; 