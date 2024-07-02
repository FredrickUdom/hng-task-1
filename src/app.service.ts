import { Injectable, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  getHello(@Query("visitor_name") visitorName: string, @Req() request: Request) {
    let client_ip =  request.ip || '127.0.0.1';
    if (client_ip.startsWith('::ffff:')) {
      client_ip = client_ip.split(':').pop();
    }
    const location = 'New York';
    const temperature = 11;
    const greeting = `Hello, ${visitorName || 'Mark'}!, the temperature is ${temperature} degrees Celsius in ${location}`;

    return{
       client_ip,
       location,
       greeting,
    }
  }
}
