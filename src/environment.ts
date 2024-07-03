import * as dotenv from 'dotenv';

dotenv.config();

export const ENVIRONMENT = {
  OPEN_WEATHER: {
    API_KEY: process.env.OPEN_WEATHER_API_KEY,
  },
};