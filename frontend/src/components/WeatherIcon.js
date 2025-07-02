import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloudy,
  WiRain,
  WiDayRain,
  WiNightAltRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiDayHaze,
  WiNightFog,
} from 'react-icons/wi';

const WeatherIcon = ({ condition, icon, size = 60 }) => {
  // Map OpenWeatherMap conditions and icons to weather icons
  const getWeatherIcon = () => {
    const isNight = icon && icon.includes('n');
    
    // Map based on OpenWeatherMap icon codes
    const iconMap = {
      // Clear sky
      '01d': WiDaySunny,
      '01n': WiNightClear,
      
      // Few clouds
      '02d': WiDayCloudy,
      '02n': WiNightAltCloudy,
      
      // Scattered clouds
      '03d': WiCloudy,
      '03n': WiCloudy,
      
      // Broken clouds
      '04d': WiCloudy,
      '04n': WiCloudy,
      
      // Shower rain
      '09d': WiRain,
      '09n': WiRain,
      
      // Rain
      '10d': WiDayRain,
      '10n': WiNightAltRain,
      
      // Thunderstorm
      '11d': WiThunderstorm,
      '11n': WiThunderstorm,
      
      // Snow
      '13d': WiSnow,
      '13n': WiSnow,
      
      // Mist/Fog
      '50d': WiDayHaze,
      '50n': WiNightFog,
    };

    // Try to get icon by OpenWeatherMap icon code first
    if (icon && iconMap[icon]) {
      return iconMap[icon];
    }

    // Fallback to condition-based mapping
    if (!condition) return WiDaySunny;

    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear')) {
      return isNight ? WiNightClear : WiDaySunny;
    }
    
    if (conditionLower.includes('cloud')) {
      if (conditionLower.includes('few') || conditionLower.includes('scattered')) {
        return isNight ? WiNightAltCloudy : WiDayCloudy;
      }
      return WiCloudy;
    }
    
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return isNight ? WiNightAltRain : WiDayRain;
    }
    
    if (conditionLower.includes('thunderstorm')) {
      return WiThunderstorm;
    }
    
    if (conditionLower.includes('snow')) {
      return WiSnow;
    }
    
    if (conditionLower.includes('mist') || conditionLower.includes('fog') || conditionLower.includes('haze')) {
      return isNight ? WiNightFog : WiFog;
    }
    
    // Default fallback
    return WiDaySunny;
  };

  // Get color based on condition
  const getIconColor = () => {
    if (!condition) return 'sunny.500';
    
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
      return 'sunny.500';
    }
    
    if (conditionLower.includes('cloud')) {
      return 'gray.500';
    }
    
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'rainy.500';
    }
    
    if (conditionLower.includes('thunderstorm')) {
      return 'gray.700';
    }
    
    if (conditionLower.includes('snow')) {
      return 'blue.400';
    }
    
    if (conditionLower.includes('mist') || conditionLower.includes('fog') || conditionLower.includes('haze')) {
      return 'gray.400';
    }
    
    return 'weather.500';
  };

  const WeatherIconComponent = getWeatherIcon();
  const iconColor = getIconColor();

  return (
    <Box>
      <Icon
        as={WeatherIconComponent}
        w={`${size}px`}
        h={`${size}px`}
        color={iconColor}
      />
    </Box>
  );
};

export default WeatherIcon; 