import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';//esto es para conectar con la base de datos
//TypeORM es un potente ORM (Mapeo Objeto-Relacional), diseñado para facilitar la interacción con bases de datos relacionales sin escribir consultas SQL complejas.
@Module({
  imports: [
TypeOrmModule.forRoot({
      type: 'postgres', // el tipo de base de datos
      host: 'localhost',//el host de pgadmin
      port: 5432,
      username: 'Alien',      
      password: 'alien',          
      database: 'NebuList',     
      entities: [__dirname + '/**/*.entity{.ts,.js}'],//la ruta de las entidades
      synchronize: true,//esto es para sincronizar la base de datos con las entidades
    }),

  ],
  controllers: [AppController],//esto es para registrar el controlador
  providers: [AppService],//esto es para registrar el servicio
  //providers=proveedores, es decir, los servicios que se van a utilizar en la aplicación
})
export class AppModule {}//esto es para exportar el módulo principal de la aplicación
