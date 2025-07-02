import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  useColorMode,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { WiDaySunny } from 'react-icons/wi';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  return (
    <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200">
      <Flex maxW="container.xl" mx="auto" px={4} py={4} align="center">
        {/* Logo and Brand */}
        <HStack spacing={2} as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Box as={WiDaySunny} size="32px" color="sunny.500" />
          <Heading size="lg" color="weather.600">
            Weather App
          </Heading>
        </HStack>

        <Spacer />

        {/* Navigation */}
        <HStack spacing={4}>
          <Button
            as={RouterLink}
            to="/"
            variant={location.pathname === '/' ? 'solid' : 'ghost'}
            colorScheme="weather"
            size="sm"
          >
            Home
          </Button>
          <Button
            as={RouterLink}
            to="/weather"
            variant={location.pathname === '/weather' ? 'solid' : 'ghost'}
            colorScheme="weather"
            size="sm"
          >
            Weather
          </Button>
          
          {/* Color Mode Toggle */}
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header; 