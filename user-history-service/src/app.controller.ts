import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return 'OK';
  }
}
