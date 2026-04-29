import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Alien' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'alien@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password!: string;
}

export class LoginDto {
  @ApiProperty({ example: 'alien@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  password!: string;
}

// DTO para la respuesta del Login
export class AuthResponseDto {
  @ApiProperty() // esto es para documentar la propiedad token en Swagger, indicando que es una cadena de texto
  token!: string;

  @ApiProperty()
  expiracion!: Date;

  @ApiProperty()
  usuarioId!: number;
}