
// Esta clase le dice a Passport como verificar y decodificar el token JWT

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// PassportStrategy: clase base para crear estrategias de autenticacion en NestJS

import { ExtractJwt, Strategy } from 'passport-jwt';
// ExtractJwt: extrae el token del header Authorization de la petición
// Strategy: la estrategia JWT de la libreria passport-jwt

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
// PassportStrategy(Strategy) le indica que esta clase implementa la estrategia JWT

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // busca el token en el header: Authorization: Bearer <token>

            ignoreExpiration: false,
            // si el token ya expiró, rechaza la petición automaticamente

            secretOrKey: 'nebulist_secret_key',
            // debe ser exactamente la misma clave que usas en JwtModule en app.module.ts
        });
    }

    async validate(payload: any) {
    // validate() se ejecuta automaticamente despues de verificar que el token es valido
    // payload contiene lo que guardaste en construirToken() del AccountsService: sub, email, username

        return {
            id: payload.sub,        // payload.sub es el userId que guardaste en el token
            email: payload.email,
            username: payload.username,
        };
        // lo que devuelve este metodo se guarda en req.user
        // por eso en los controllers puedes usar req.user.id
    }
}