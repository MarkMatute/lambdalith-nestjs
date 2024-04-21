import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingController } from './testing/testing.controller';

@Module({
  imports: [],
  controllers: [AppController, TestingController],
  providers: [AppService],
})
export class AppModule {}
