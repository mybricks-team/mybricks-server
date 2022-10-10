import {Module} from '@nestjs/common';
import TestService from './services/test';


@Module({
  imports: [],
  controllers: [
    TestService
  ],
  providers: []
})
export class AppModule {
  constructor() {
  }
}