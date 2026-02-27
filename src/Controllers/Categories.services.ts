
//la clase de services es para consultar a la base de datos, es decir, es la parte de la logica de negocio


import { Injectable,NotFoundException,BadRequestException} from '@nestjs/common';//@nesrjs/common es un paquete que contiene decoradores y clases comunes para construir aplicaciones con NestJS
//Injectable es un decorador que indica que esta clase puede ser inyectada como una dependencia en otros archivos
//NotFoundException es una clase que se utiliza para lanzar una excepción cuando no se encuentra un recurso //Categoria no encontrada
//BadRequestException es una clase que se utiliza para lanzar una excepción cuando se recibe una solicitud incorrecta //ya existe una categoria con ese nombre


