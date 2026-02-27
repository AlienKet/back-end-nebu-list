

//datos que el usuario envía para registrarse
export class RegisterDto{
username:string;
email:string
password:string;
}

export class LoginDto{
email:string;
password:string;
}
//esto devuelve la api despues de rgistrarse o iniciar sesion
export class AuthResponseDto{
token:string;
expiracion:Date;
usuarioId:string;
}