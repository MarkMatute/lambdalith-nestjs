import { Controller, Get } from '@nestjs/common';

@Controller('testing')
export class TestingController {
  @Get('/testing')
  async testing() {
    return 'testing';
  }
}
