

//esta clase solo recibe las peticiones HTTP y llama al AuthService
//las peticiones HTTP son para registrar un nuevo usuario, iniciar sesión y renovar el token


import{Controller, Post,Get,Body, UseGuards, Request} from '@nestjs/common';
//Controller define la clase como controlador
//Post define que la función es para manejar peticiones POST //POST es para enviar datos al servidor
//Get es para manejar peticiones GET //GET es para obtener datos del servidor
//Body define que el parámetro de la función se obtiene del cuerpo de la petición
//UseGuards define que la función está protegida por un guard, en este caso el JwtAuthGuard
//Request define que el parámetro de la función se obtiene de la petición

import {AccountsService}from './Accounts.services';
import {RegisterDto, LoginDto} from '../DTOs/Auth/Auth.dto';
//aqui se importan los DTOs que se utilizan para definir la estructura de los datos que se reciben y se envían en las peticiones HTTP

import {JwtAuthGuard} from '../Context/jwt-auth.guard';

@Controller('api/accounts')//define la ruta base para las funciones de este controlador, en este caso /api/cuentas

export class AccountsController {
    constructor ( 
    private readonly accountsService: AccountsService
        // inyecta el service
    ) {}

     @Post('registrar')  // esto es para registrar un nuevo usuario
    async registrar(@Body() registerDto: RegisterDto) {// body es para obtener los datos del cuerpo de la petición


        return this.accountsService.register(registerDto);
    }

     @Post('login')  // equivale al [HttpPost("Login")] del profe
    async login(@Body() loginDto: LoginDto) {

        return this.accountsService.login(loginDto);
    }
     @UseGuards(JwtAuthGuard) // esto es para proteger la ruta, solo los usuarios con un token válido pueden acceder a esta función
    @Get('renovar-token')    // aqui es para renovar el token
    async renovarToken(@Request() req) {
    // @Request() req: accede al usuario del token

        const userId = req.user.id;//aqui es para obtener el id del usuario del token, req.user es el objeto que contiene la información del usuario decodificada del token
        
        return this.accountsService.renovarToken(userId);
    }
}
