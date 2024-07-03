import { Injectable, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import * as requestIp from 'request-ip';
import * as geoip from 'geoip-lite';
import { AppError } from './util/app.err';
import { WeatherService } from './weather.service';


@Injectable()
export class AppService {
  
    constructor(private readonly weatherService: WeatherService) {}
  
    getUserIp(req): string {
      let ipAddress = requestIp.getClientIp(req);
  
      if (ipAddress && ipAddress.includes('::ffff:')) {
        ipAddress = ipAddress.replace('::ffff:', '');
      }
  
      console.log('ipAddress', ipAddress);
  
      return ipAddress ?? '104.28.220.44';
    }
  
    async getGeoLocation(ip: string) {
      const geo = geoip.lookup(ip);
      console.log('geo', geo);
  
      if (!geo) {
        throw new AppError('Could not determine location from IP address', 400);
      }
  
      const { city, region, country } = geo;
      console.log(geo.city);
      
  
      return {
        city,
        region,
        country,
      };
    }
  
    async getTemperatureInCelsius(city: string): Promise<number> {
      return this.weatherService.getTemperatureInCelsius(city);
    }
  }

