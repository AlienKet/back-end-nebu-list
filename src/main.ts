import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
//npm run start:dev
//http://localhost:3000/api
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // habilita CORS para que Angular pueda comunicarse con el backend
   app.enableCors({
    origin: 'http://localhost:4200', // puerto donde corre Angular
    methods: 'GET,POST,PUT,DELETE,OPTIONS',  // agrega OPTIONS para peticiones preflight
    allowedHeaders: 'Content-Type, Authorization',
  });

  // valida automaticamente los datos que llegan en los DTOs 
   app.useGlobalPipes(new ValidationPipe({
    transform: true,       // convierte los datos al tipo correcto automaticamente
    whitelist: true,       // elimina campos que no esten en el DTO
  }));

  const config = new DocumentBuilder()
    .setTitle('NebuList API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();