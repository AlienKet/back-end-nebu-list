import { Injectable } from '@nestjs/common';
//NestJS es un framework para construir aplicaciones del lado del servidor con Node.js.
//npm run start:dev levanta servidor
//http://localhost:3000
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
