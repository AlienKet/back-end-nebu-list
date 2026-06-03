## Correr local
npm run start:dev
## Url Local
http://localhost:3000/api
## Url render
https://back-end-nebu-list.onrender.com/api 

## Ejemplo login
  "username": "Alien",
  "email": "alien@gmail.com",
  "password": "123456"

**Backend:**
El Backend es el motor oculto de la aplicación. Mientras que el Frontend se encarga de lo que el usuario ve, el Backend procesa la información, gestiona la seguridad y se comunica de manera directa con la base de datos para almacenar y recuperar la información de la agenda.

**API REST:** Es la interfaz que permite que aplicaciones externas se comuniquen con el servidor mediante métodos como GET (leer), POST (crear), PUT (editar) y DELETE (borrar)

**Api**: Son reglas para que dos softwares se comuniquen e intercambien datos

**Endpoint:** Es la ubicacion en donde la api recibe las solicitudes de otro software

**Contexto (Context)** se refiere al entorno, escenario o conjunto de datos globales que rodean la ejecución de una acción. Su propósito es proveer información crucial sobre "quién" está interactuando con el sistema y "bajo qué condiciones" lo está haciendo, para que el resto de la aplicación pueda comportarse adecuadamente.

**Controller (Controlador):** Es el "recepcionista". Su única función es recibir la petición del usuario y decidir a qué servicio mandarla.

**Service (Servicio):** Contienen la lógica de negocio pura de la aplicación. Aquí es donde se realizan las operaciones reales: verificar si un correo ya existe, encriptar contraseñas, calcular fechas de vencimiento de las tareas y ordenar los datos antes de guardarlos. El controlador le pide ayuda al servicio para procesar la información.

**DTO (Data Transfer Object):** Define exactamente qué datos se permite que el usuario nos envíe (evita que nos manden basura o datos maliciosos).

**Entity (Entidad)/Models:** Es el mapa de la base de datos. Define qué columnas tiene una tabla (ej: id, title, status).

**Lenguaje usado:** TypeScript.
Su principal característica es el **tipado estático**. Mientras que en JavaScript una variable puede cambiar de texto a número sin previo aviso (causando errores en producción), TypeScript obliga a definir qué tipo de dato albergará cada variable desde el inicio.

**Framework usado:** NestJS
NestJS está construido nativamente con y para TypeScript, lo que permite aprovechar al máximo la programación orientada a objetos y el tipado estático en el servidor.
**Arquitectura Inspirada en Angular:** Utiliza una arquitectura fuertemente organizada basada en Módulos, Controladores y Servicios. Esto soluciona el problema histórico de Node.js, donde cada desarrollador estructuraba el código a su manera. NestJS impone un orden estricto de carpetas que facilita el mantenimiento del Backend a gran escala.

## ORM (Object-Relational Mapping)-(Mapeo Objeto-Relacional)
**¿Qué es y para qué sirve?** Es una herramienta de software que actúa como un traductor entre el código de programación (TypeScript) y la base de datos (SQL).
**¿Por qué se usa en este proyecto?** * 
**Automatización:** Permite definir las tablas de la base de datos como si fueran clases simples de TypeScript (los archivos `.entity.ts`).
**Seguridad:** Protege la aplicación de forma automática contra ataques comunes como la inyección SQL.
**Abstracción:** Si en el futuro se decide cambiar el tipo de base de datos, el código del Backend casi no tiene que modificarse, ya que el ORM se encarga de traducir todo el trabajo pesado.

**ORM usado**: TypeORM.
Permite interactuar con bases de datos relacionales utilizando clases y objetos de TypeScript o JavaScript, en lugar de escribir consultas SQL directas. 

### CORS (Cross-Origin Resource Sharing)--(Intercambio de Recursos de Origen Cruzado).
**¿Qué es?** Es una medida de seguridad que los navegadores web aplican de forma estricta. Si el Frontend está alojado en una dirección e intenta pedirle datos a un Backend que está en otra dirección diferente, el navegador bloqueará la petición por defecto.
**Solución en el Backend:** Para que el proyecto funcione correctamente en producción, se debe configurar el Backend para que "dé permiso" explícito a la URL del Frontend, permitiéndole realizar peticiones como registros e inicios de sesión sin ser bloqueado.

## Lógica de Flujo:
Petición: Llega una solicitud HTTP al Controller.

Validación: El DTO revisa que los datos sean correctos.

Lógica: El Service busca o guarda la información usando TypeORM.

Respuesta: El servidor devuelve un objeto JSON y un código de estado (ej: 200 OK, 201 Created).
  
## Paleta de Colores
**Fondo (Dark Core):** `##000000` o `##050505` 
**Verde Neón (Matrix Green):** `##00FF44` o `##00CC44`
**Amarillo de Advertencia (Neon Gold):** `##FFB300` o `##FFA500`
**Rosa Neón Destructivo (Cyber Pink / Danger):** `##FF0055` o `##FF0066`, boton Eliminar
**Gris Opaco (Muted Grey):** `##222222` (Fondo) y `##555555` (Texto)