import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(@Query('visitor_name') visitorName: string, @Req() request: Request) {
    return this.appService.getHello(visitorName, request);
  }
}
