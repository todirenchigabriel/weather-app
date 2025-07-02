import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  colors: {
    weather: {
      50: '#e6f3ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#0073e6',
      600: '#005bb3',
      700: '#004380',
      800: '#002b4d',
      900: '#00131a',
    },
    sunny: {
      50: '#fff8e1',
      100: '#ffecb3',
      200: '#ffe082',
      300: '#ffd54f',
      400: '#ffca28',
      500: '#ffc107',
      600: '#ffb300',
      700: '#ffa000',
      800: '#ff8f00',
      900: '#ff6f00',
    },
    rainy: {
      50: '#e8f4f8',
      100: '#c3e2ed',
      200: '#9ecfe1',
      300: '#79bcd6',
      400: '#54a9ca',
      500: '#3f97bf',
      600: '#2e7d9a',
      700: '#1d6375',
      800: '#0c4950',
      900: '#002f2b',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'weather',
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'lg',
        },
      },
    },
  },
});

export default theme; 