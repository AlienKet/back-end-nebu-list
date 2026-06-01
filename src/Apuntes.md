npm run start:dev

http://localhost:3000/api

https://back-end-nebu-list.onrender.com/api 


  "username": "Alien",
  "email": "alien@gmail.com",
  "password": "123456"

El back-end es el cerebro y el almacén. Su trabajo es proteger los datos y procesar la lógica de negocio.

API REST: Es la interfaz que permite que aplicaciones externas se comuniquen con el servidor mediante métodos como GET (leer), POST (crear), PUT (editar) y DELETE (borrar)

Controller (Controlador): Es el "recepcionista". Su única función es recibir la petición del usuario y decidir a qué servicio mandarla.

Entity (Entidad)/Models: Es el mapa de la base de datos. Define qué columnas tiene una tabla (ej: id, title, status).

DTO (Data Transfer Object):Define exactamente qué datos se permite que el usuario nos envíe (evita que nos manden basura o datos maliciosos).

Service (Servicio):Aquí es donde ocurren los: cálculos, validaciones de seguridad y comunicación con la base de datos.

Lenguaje: TypeScript.

Framework: NestJS

ORM (Modelo de Datos): TypeORM.

Funcionalidad: Permite gestionar la base de datos usando clases de TypeScript (Entidades) en lugar de código SQL manual.

Una api son reglas para que dos softwares se comuniquen e intercambien datos
Endpoint: Es la ubicacion en donde la api recibe las solicitudes de otro software

Lógica de Flujo:
Petición: Llega una solicitud HTTP al Controller.

Validación: El DTO revisa que los datos sean correctos.

Lógica: El Service busca o guarda la información usando TypeORM.

Respuesta: El servidor devuelve un objeto JSON y un código de estado (ej: 200 OK, 201 Created).





  