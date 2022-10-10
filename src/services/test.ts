import { Get, Controller } from '@nestjs/common';

@Controller('api')
export default class TestService {
  @Get('/test')
  root(): string {
    return 'Hello World!';
  }
}