import { Injectable, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import * as requestIp from 'request-ip';
import * as geoip from 'geoip-lite';
import { AppError } from './util/app.err';
import { WeatherService } from './weather.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';



@Injectable()
export class AppService {
  
    constructor(private readonly weatherService: WeatherService, private configService:ConfigService) {}
  
    getUserIp(req): any {
      let ipAddress = requestIp.getClientIp(req);
    
      if (ipAddress && ipAddress.includes('::ffff:')) {
        ipAddress = ipAddress.replace('::ffff:', '');
      }
  
      console.log('ipAddress', ipAddress);
  
      return ipAddress ?? '104.28.220.44';
    }
  
    async getGeoLocation(ip) {
      // const geo = await geoip.lookup(ip);
     
      // console.log('geo', geo);
      // console.log(  geo?.city,  geo?.region,  geo?.country);
  
      // if (!geo) {
      //   throw new AppError('Could not determine location from IP address', 400);
      // }
  
      // const { city,  country } = geo;
      // console.log(geo.city, geo.country);
    
  
      // return {
      //   city,
      //  ip,
      //  country,
      // };

      const apiKey = await this.configService.get<string>('IPINFO_API_KEY');
      const url = `https://ipinfo.io/json?ip=${ip}?token=${apiKey}`;
      
  
      const response = await axios.get(url);
      const { city, region, country, loc, org } = response.data;
  
      if (!city || !region || !country || !loc || !org) {
        throw new Error('Could not determine location or ISP from IP address');
      }
  
      return {
        city,
        region,
        country,
        loc,
        isp: org,
      };
    }
  
    async getTemperatureInCelsius(city: string): Promise<number> {
      return this.weatherService.getTemperatureInCelsius(city);
    }
  }

