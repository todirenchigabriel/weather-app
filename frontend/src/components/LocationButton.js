import React, { useState } from 'react';
import {
  Button,
  HStack,
  Icon,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { MdMyLocation, MdLocationDisabled } from 'react-icons/md';
import { geolocationApi } from '../services/api';

const LocationButton = ({ onLocationDetected, size = "md", variant = "outline" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLocationClick = async () => {
    setIsLoading(true);
    
    try {
      const position = await geolocationApi.getCurrentPosition();
      
      toast({
        title: 'Location Found',
        description: 'Successfully detected your location!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      
      onLocationDetected(position);
    } catch (error) {
      toast({
        title: 'Location Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if geolocation is supported
  const isGeolocationSupported = 'geolocation' in navigator;

  if (!isGeolocationSupported) {
    return (
      <Button
        size={size}
        variant={variant}
        colorScheme="gray"
        isDisabled
        leftIcon={<Icon as={MdLocationDisabled} />}
      >
        Location Not Supported
      </Button>
    );
  }

  return (
    <Button
      size={size}
      variant={variant}
      colorScheme="weather"
      onClick={handleLocationClick}
      isLoading={isLoading}
      loadingText="Getting Location..."
      leftIcon={
        isLoading ? (
          <Spinner size="sm" />
        ) : (
          <Icon as={MdMyLocation} />
        )
      }
      _hover={{
        transform: isLoading ? 'none' : 'translateY(-1px)',
        shadow: isLoading ? 'md' : 'lg',
      }}
      transition="all 0.2s"
    >
      {isLoading ? 'Getting Location...' : 'Use My Location'}
    </Button>
  );
};

export default LocationButton; 