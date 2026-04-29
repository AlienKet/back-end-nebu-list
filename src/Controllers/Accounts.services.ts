
//esta clase es para registrar usuarios, verificar credenciales y generar token JWT
//Un token JWT es para que un usuario no tenga que estar ingresando su usuario y contraseña cada vez que quiera acceder a una ruta protegida

//npm install bcrypt 
// npm install --save-dev @types/bcrypt
//esta libreria es paraencriptar contraseñas

import { Injectable,BadRequestException, UnauthorizedException} from '@nestjs/common';
//Inyectable marca la clase como un proveedor que se puede inyectar en otros archivos
//BadRequestException se utiliza para lanzar una excepción cuando se recibe una solicitud incorrecta
//UnauthorizedException se utiliza para lanzar una excepción cuando el usuario no tiene autorización para acceder a una ruta protegida

import {InjectRepository} from '@nestjs/typeorm';//InjectRepository es un decorador que se utiliza para inyectar un repositorio de TypeORM en la clase
//TypeORM es un ORM (Object-Relational Mapping) que se utiliza para interactuar con bases de datos relacionales en aplicaciones Node.js

import {Repository} from 'typeorm';//Repository es una clase que se utiliza para interactuar con la base de datos a través de TypeORM

import {JwtService}from '@nestjs/jwt';//JwtService es una clase que se utiliza para generar y verificar tokens JWT en NestJS

import * as bcrypt from 'bcrypt';//bcrypt es una libreria para encriptar contraseñas de forma segura

import {User} from '../Models/User.entity';//User es la entidad que representa a los usuarios en la base de datos

import { RegisterDto, LoginDto, AuthResponseDto } from '../DTOs/Auth/Auth.dto';


@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,//aqui es para interactuar con la tabla de usuarios en la base de datos
        private jwtService: JwtService,//aqui es para generar y verificar tokens JWT
    ){}

    //crear un nuevo usuario

    async register(registerDto: RegisterDto): Promise<AuthResponseDto>{//Promise es para indicar que esta función devuelve una promesa que se resuelve con un objeto de tipo AuthResponseDto
    
    //verificar email
    const usuarioExiste= await this.userRepository.findOne({where:{email:registerDto.email}});//aqui es para buscar un usuario por su email en la base de datos
        if(usuarioExiste){
            throw new BadRequestException('Ya existe un usuario con ese email');
        }

         const passwordHash = await bcrypt.hash(registerDto.password, 10);
        // 10 es el número de veces que se encripta, más alto = más seguro pero más lento

        //Crear usuario

        const usuario= this.userRepository.create({//userRepository es para crear una nueva instancia de la entidad User con los datos proporcionados
            username: registerDto.username,
            email: registerDto.email,
            passwordHash,
            isActive:true,  
        });

         await this.userRepository.save(usuario);//aqui es para guardar el nuevo usuario en la base de datos

         return this.construirToken(usuario);//devuelve el token

    }

    //verificar credenciales y generar token

    async login(loginDto: LoginDto): Promise<AuthResponseDto>{
    
        //buscar usuario por email
        const usuario=await this.userRepository.findOne({where:{email:loginDto.email}});//aqui es para buscar un usuario por su email en la base de datos

        if(!usuario){
            throw new UnauthorizedException('CLogin Incorrecto');
        }

        //verificar contraseña

        const passwordValido= await bcrypt.compare(loginDto.password, usuario.passwordHash);//aqui es para comparar la contraseña ingresada con la contraseña encriptada en la base de datos

        if(!passwordValido){
            throw new UnauthorizedException('Login Incorrecto');
        }

        if(!usuario.isActive){
            throw new UnauthorizedException('Usuario Inactivo');
        }

        return this.construirToken(usuario);//devuelve el token
    
    }

    //generaer token
    
        private construirToken(usuario:User): AuthResponseDto {
            const expiracion= new Date();
            expiracion.setDate(expiracion.getDate() +30);//validar token por 30 dias

            const payload={//payload es la informafion que se guarda dentro del token
                sub:usuario.id,
                email:usuario.email,
                username:usuario.username,

            };

            const token =this.jwtService.sign(payload,{expiresIn: '30d'});//sign() genera el token jwt

            return{
                token,                      //token generado
                expiracion,             //fecha de expiracion
                usuarioId: usuario.id,
            };
        }

        //renovar token

        async renovarToken(userId: number): Promise<AuthResponseDto>{//aqui es para renovar el token, se le pasa el id del usuario para generar un nuevo token con los datos actuales del usuario

            const usuario = await this.userRepository.findOne({//aqui es para buscar un usuario por su id en la base de datos
                //findOne es para buscar un solo usuario, si se encuentra devuelve el usuario, si no se encuentra devuelve null
                where: {id:userId}// los : es para indicar que es un parametro que se va a pasar a la función, en este caso el id del usuario que se va a renovar el token
            });

            if(!usuario){
                throw new UnauthorizedException('Usuario no encontrado');
            }

            return this.construirToken(usuario);//genera un nuevo token con los datos actuales del usuario
        }



    }
