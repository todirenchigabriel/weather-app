import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import theme from './theme';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
); 