import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule,  } from '@nestjs/config';
import { HttpExceptionFilter } from './util/httpExceptionFilter';
import { WeatherService } from './weather.service';
@Module({
  imports: [HttpModule, ConfigModule.forRoot({isGlobal: true})

  ],
  controllers: [AppController],
  providers: [AppService, WeatherService, { provide: 'APP_FILTER', useClass: HttpExceptionFilter }],

})
export class AppModule {}
