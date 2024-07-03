import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  constructor(private configService: ConfigService) {}

  async getTemperatureInCelsius(city: string): Promise<number> {
    // const apiKey = this.configService.get<string>('OPEN_WEATHER_API_KEY');
    const apiKey = this.configService.get<string>('WEATHER_API');
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      const response = await axios.get(apiUrl);
      if (response.status !== 200 || !response.data.current.temp_c) {
        throw new Error('Failed to fetch temperature');
      }
      return response.data.current.temp_c;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Could not fetch weather data');
    }
  }
}
