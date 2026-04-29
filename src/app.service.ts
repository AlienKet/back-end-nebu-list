import { Injectable } from '@nestjs/common';

//http://localhost:3000
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
