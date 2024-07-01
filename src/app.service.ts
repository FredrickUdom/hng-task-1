import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(@Query("visitor_name") visitorName: string) {
    const client_ip = '127.0.0.1';
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
