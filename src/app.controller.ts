import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { AppError } from './util/app.err';

@Controller('api')
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get('hello')
 
  async getHello(@Query('visitor_name') visitorName: string, @Req() req: Request) {
    const ip = this.appService.getUserIp(req.ip);
    const { city } = await this.appService.getGeoLocation(ip);
    const temperature = await this.appService.getTemperatureInCelsius(city);

    console.log({ ip, city, temperature });

    const requesterCity = city ?? 'New York';

    if (!ip || !city) {
      throw new AppError(
        'Sorry we are having network issues, please try again',
        400
      );
    }

    const data = {
      client_ip: ip, // The IP address of the requester
      location: requesterCity, // The city of the requester
      greeting: `Hello, ${visitorName ?? 'Visitor'}!, the temperature is ${temperature} degrees Celsius in ${requesterCity}`,
    };

    return data
  }
}
