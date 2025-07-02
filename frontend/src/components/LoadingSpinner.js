import React from 'react';
import {
  VStack,
  Spinner,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

const LoadingSpinner = ({ 
  message = "Loading...", 
  size = "xl",
  height = "200px",
  showMessage = true
}) => {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH={height}
      w="full"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="weather.500"
          size={size}
        />
        {showMessage && (
          <Text color={textColor} fontSize="md" textAlign="center">
            {message}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default LoadingSpinner; 