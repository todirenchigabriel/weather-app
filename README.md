# Weather Application

A full-stack weather application that allows users to get weather information based on their location or by searching for cities with autocomplete functionality.

## Features

- **City Search with Autocomplete**: Type to search for cities with real-time suggestions
- **Current Weather Display**: Shows temperature, weather conditions, humidity, and wind speed
- **Geolocation Support**: Automatically detect user's location (optional)
- **Responsive Design**: Clean, modern UI built with Chakra UI
- **Error Handling**: Comprehensive error handling for API failures and invalid inputs

## Tech Stack

### Frontend
- React 18
- React Query (TanStack Query)
- Chakra UI
- React Router
- Axios

### Backend
- Node.js
- Express.js
- OpenWeatherMap API
- CORS support

## Project Structure

```
weather-app/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── backend/           # Node.js server
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── middleware/
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=5000
   ```

4. **Start the application**
   
   **Option 1: Run both servers separately**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```
   
   **Option 2: Run from root directory**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

- `GET /api/weather?city={cityName}` - Get weather for a specific city
- `GET /api/weather?lat={lat}&lon={lon}` - Get weather for coordinates
- `GET /api/cities?query={searchTerm}` - Get city suggestions for autocomplete

## Environment Variables

### Backend (.env)
- `OPENWEATHER_API_KEY` - Your OpenWeatherMap API key
- `PORT` - Server port (default: 5000)

## Features Overview

### Autocomplete Search
- Real-time city search with suggestions
- Debounced API calls for better performance
- Keyboard navigation support

### Weather Display
- Current temperature and "feels like" temperature
- Weather description with appropriate icons
- Humidity, wind speed, and pressure
- Responsive design for all screen sizes

### Error Handling
- Network error handling
- Invalid city name handling
- Geolocation permission errors
- API rate limiting handling

## Development

### Frontend Development
```bash
cd frontend
npm start
```

### Backend Development
```bash
cd backend
npm run dev
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

## Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder to your preferred platform

### Backend (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the backend directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 