import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class FallbackController {
  @Get()
  host(): string {
    return 'Welcome to FitBack!';
  }
}
