//.guard es para  indicar a los desarrolladores que es un guardia que protege rutas

//esta clase es para revisar que el usuario tenga un token JWT válido antes de dejarle entrar
//JWT es un estándar abierto para compartir información de forma segura entre dos partes, en este caso, el cliente y el servidor

//esto se debe instalar porque en NestJS la autenticacion no viene incluida:
//  npm install @nestjs/passport @nestjs/jwt passport passport-jwt
//  npm install --save-dev @types/passport-jwt

// passport es la libreria de autenticacion 


import {Injectable} from '@nestjs/common';//Injectables es para que la clase se pueda usar en otros archivos
//@nestjs/common es un paquete que contiene decoradores y clases comunes para construir aplicaciones con NestJS

import {AuthGuard} from '@nestjs/passport';//AuthGuard es una clase que se utiliza para proteger rutas y controlar el acceso a ellas
//@nestjs/pasport es para conectar NestJS con passport, el sistema de autenticación

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}//JwtAuthGuard es una clase que extiende de AuthGuard y le pasa el nombre de la estrategia que se va a utilizar, en este caso, 'jwt'


