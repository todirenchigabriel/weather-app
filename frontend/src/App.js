import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container maxW="container.xl" py={8}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App; 