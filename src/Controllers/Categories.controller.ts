
// Esta clase recibe las peticiones HTTP que llegan a las rutas de categorias

import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// Controller :marca esta clase como un controlador que maneja rutas HTTP
// Get obtener datos
// peticiones POST (crear datos)
// Put actualizar datos
// Body :extrae los datos que vienen en el cuerpo de la petición
// Param :extrae los parametros que vienen en la URL, como el :id
// UseGuards :protege la ruta, solo usuarios autenticados pueden acceder
// Request :accede al objeto de la petición HTTP para obtener datos del usuario autenticado

import { CategoriesService } from './Categories.services';
// se importa el service que contiene toda la logica de negocio

import { CreateCategoryDto, UpdateCategoryDto } from '../DTOs/Categories/Category.dto';
// se importan los DTOs que definen que datos se esperan recibir

import { JwtAuthGuard } from '../Context/jwt-auth.guard';
// se importa el guard que verifica que el usuario tenga un token JWT valido

@Controller('api/categories')
// define la ruta base de este controlador, todas las rutas empezaran con api/categories
export class CategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService
        // inyecta el service, readonly significa que no se puede reasignar después
    ) {}

   
    // GET: api/categories
    // Devuelve todas las categorias del usuario autenticado

    @UseGuards(JwtAuthGuard) // verifica el token JWT antes de ejecutar la funcion
    @Get() // responde a peticiones GET en api/categories
    async getCategories(@Request() req) {
    // @Request() req :contiene la informacion de la peticion, incluyendo el usuario del token

        const userId = req.user.id;
        // req.user.id :id del usuario extraido del token JWT en jwt.strategy.ts

        return this.categoriesService.findAll(userId);
        // llama al service pasando el userId para traer solo las categoriasde este usuario
    }

   
    // GET: api/categories/:id
    // Devuelve una sola categoria por su id
 
    @UseGuards(JwtAuthGuard) // ruta protegida, requiere token JWT valido
    @Get(':id') // responde a GET en api/categories/:id, el :id es un parametro variable
    async getCategory(@Param('id') id: string, @Request() req) {
    // @Param('id') id :extrae el valor del :id que viene en la URL

        const userId = req.user.id; // id del usuario autenticado del token
        return this.categoriesService.findOne(id, userId);
        // llama al service con el id de la categoria y el userId del usuario
    }

    // POST: api/categories
    // Crea una nueva categoria

    @UseGuards(JwtAuthGuard) // ruta protegida, requiere token JWT valido
    @Post() // responde a peticiones POST en api/categories
    async createCategory(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    // @Body() createCategoryDto :extrae los datos del cuerpo de la peticion y los mapea al DTO

        const userId = req.user.id; // id del usuario autenticado del token
        return this.categoriesService.create(createCategoryDto, userId);
        // llama al service con los datos del DTO y el userId del usuario autenticado
    }

  
    // PUT: api/categories/:id
    // Actualiza una categoria existente
  
    @UseGuards(JwtAuthGuard) // ruta protegida, requiere token JWT valido
    @Put(':id') // responde a peticiones PUT en api/categories/:id
    async updateCategory(
        @Param('id') id: string,                        // id de la categoria a actualizar desde la URL
        @Body() updateCategoryDto: UpdateCategoryDto,   // nuevos datos desde el cuerpo de la petición
        @Request() req                                  // petición HTTP para obtener el usuario
    ) {
        const userId = req.user.id; // id del usuario autenticado del token
        return this.categoriesService.update(id, updateCategoryDto, userId);
        // llama al service con el id, los nuevos datos y el userId
    }

    
    // DELETE: api/categories/:id
    // Elimina una categoria
   
    @UseGuards(JwtAuthGuard) // ruta protegida, requiere token JWT valido
    @Delete(':id') // responde a peticiones DELETE en api/categories/:id
    async deleteCategory(@Param('id') id: string, @Request() req) {

        const userId = req.user.id; // id del usuario autenticado del token
        await this.categoriesService.remove(id, userId);
        // llama al service para eliminar la categoria, await espera a que termine

        return { mensaje: 'categoria eliminada exitosamente' };
        // devuelve un mensaje de confirmación con status 200
    }
}