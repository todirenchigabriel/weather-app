import React, { useState, useRef } from 'react';
import {
  Box,
  Input,
  VStack,
  Text,
  useOutsideClick,
  Spinner,
  Alert,
  AlertIcon,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { MdLocationOn } from 'react-icons/md';
import { weatherApi } from '../services/api';

const CitySearch = ({ onCitySelect, placeholder = "Search for a city...", size = "md" }) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedValue] = useDebounce(inputValue, 300);
  const ref = useRef();

  // Close dropdown when clicking outside
  useOutsideClick({
    ref: ref,
    handler: () => setShowDropdown(false),
  });

  // City search query
  const {
    data: searchResults,
    isLoading: isSearching,
    error: searchError,
  } = useQuery({
    queryKey: ['cities', debouncedValue],
    queryFn: () => weatherApi.searchCities(debouncedValue),
    enabled: debouncedValue.length >= 2,
    staleTime: 300000, // 5 minutes
  });

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(value.length >= 2);
  };

  // Handle city selection
  const handleCityClick = (city) => {
    setInputValue(city.displayName);
    setShowDropdown(false);
    onCitySelect(city);
  };

  // Handle enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchResults?.cities?.length > 0) {
      handleCityClick(searchResults.cities[0]);
    }
  };

  const cities = searchResults?.cities || [];

  return (
    <Box position="relative" ref={ref}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => inputValue.length >= 2 && setShowDropdown(true)}
        placeholder={placeholder}
        size={size}
        bg="white"
        _focus={{
          borderColor: 'weather.400',
          boxShadow: '0 0 0 1px var(--chakra-colors-weather-400)',
        }}
      />

      {/* Dropdown */}
      {showDropdown && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
          shadow="lg"
          zIndex={1000}
          mt={1}
        >
          {isSearching && (
            <Box p={4} textAlign="center">
              <HStack justify="center" spacing={2}>
                <Spinner size="sm" color="weather.500" />
                <Text fontSize="sm" color="gray.600">
                  Searching cities...
                </Text>
              </HStack>
            </Box>
          )}

          {searchError && (
            <Box p={2}>
              <Alert status="error" size="sm">
                <AlertIcon />
                <Text fontSize="sm">
                  Error searching cities. Please try again.
                </Text>
              </Alert>
            </Box>
          )}

          {!isSearching && !searchError && cities.length === 0 && debouncedValue.length >= 2 && (
            <Box p={4} textAlign="center">
              <Text fontSize="sm" color="gray.500">
                No cities found for "{debouncedValue}"
              </Text>
            </Box>
          )}

          {!isSearching && cities.length > 0 && (
            <VStack spacing={0} align="stretch">
              {cities.map((city, index) => (
                <Box
                  key={`${city.name}-${city.country}-${index}`}
                  p={3}
                  _hover={{
                    bg: 'weather.50',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCityClick(city)}
                  borderBottomWidth={index < cities.length - 1 ? '1px' : '0'}
                  borderColor="gray.100"
                >
                  <HStack spacing={2}>
                    <Icon as={MdLocationOn} color="weather.500" />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="medium">
                        {city.displayName}
                      </Text>
                      {city.coordinates && (
                        <Text fontSize="xs" color="gray.500">
                          {city.coordinates.lat.toFixed(2)}, {city.coordinates.lon.toFixed(2)}
                        </Text>
                      )}
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CitySearch; 