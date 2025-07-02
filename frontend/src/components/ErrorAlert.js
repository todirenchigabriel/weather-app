import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  Button,
  Box,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { MdRefresh, MdError } from 'react-icons/md';

const ErrorAlert = ({ 
  title = "Error", 
  message = "Something went wrong", 
  onRetry = null,
  showRetry = true,
  status = "error"
}) => {
  return (
    <Box w="full" py={8}>
      <Alert
        status={status}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        minH="200px"
        borderRadius="md"
      >
        <AlertIcon boxSize="60px" mr={0} />
        <AlertTitle mt={4} mb={2} fontSize="lg">
          {title}
        </AlertTitle>
        <AlertDescription maxW="sm" fontSize="md" mb={6}>
          {message}
        </AlertDescription>
        
        {showRetry && onRetry && (
          <Button
            colorScheme={status === 'error' ? 'red' : 'blue'}
            variant="outline"
            leftIcon={<Icon as={MdRefresh} />}
            onClick={onRetry}
            _hover={{
              transform: 'translateY(-1px)',
              shadow: 'md',
            }}
            transition="all 0.2s"
          >
            Try Again
          </Button>
        )}
      </Alert>
    </Box>
  );
};

export default ErrorAlert; 