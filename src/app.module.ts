import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './Context/jwt.strategy';

import { TypeOrmModule } from '@nestjs/typeorm';
// TypeORM es el ORM para conectar con PostgreSQL

import { JwtModule } from '@nestjs/jwt';
// JwtModule es para generar y verificar tokens JWT en toda la aplicación

// Entidades (tablas de la base de datos)
import { User } from './Models/User.entity';
import { Category } from './Models/Category.entity';
import { Task } from './Models/Task.entity';

// Controladores
import { AccountsController } from './Controllers/Accounts.controller';
import { CategoriesController } from './Controllers/Categories.controller';

// Servicios
import { AccountsService } from './Controllers/Accounts.services';
import { CategoriesService } from './Controllers/Categories.services';

@Module({
  imports: [
    // Conexión a PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'Alien',
      password: 'alien',
      database: 'NebuList',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // detecta automaticamente todas las entidades del proyecto
      synchronize: true,
      // crea o actualiza las tablas automaticamente segun las entidades
      
    }),
  
    PassportModule.register({ defaultStrategy: 'jwt' }),// Configura Passport para usar JWT como estrategia de autenticación por defecto

    // Registra las entidades para poder usar sus repositorios con @InjectRepository
    TypeOrmModule.forFeature([User, Category, Task]),

    // Configura JWT de forma global para toda la aplicación
    JwtModule.register({
      global: true,           // disponible en todos los modulos sin reimportar
      secret: 'nebulist_secret_key', // clave secreta para firmar los tokens
      signOptions: { expiresIn: '30d' }, // los tokens duran 30 dias
    }),
  ],

  controllers: [
    AppController,
    AccountsController,   // controlador de registro y login
    CategoriesController, // controlador de categorias
  ],

  providers: [
    AppService,
    AccountsService,   // servicio de registro y login
    CategoriesService, // servicio de categorias
    JwtStrategy,      // estrategia para verificar tokens JWT
  ],
})
export class AppModule {}