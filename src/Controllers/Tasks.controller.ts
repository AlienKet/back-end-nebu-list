
// estta clase recibe las peticiones HTTP que llegan a las rutas de tareas

import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
// Controller marca esta clase como un controlador que maneja rutas HTTP
// Param extrae los parametros que vienen en la URL como el :id
// Request accede al objeto de la peticion para obtener datos del usuario autenticado
// Query extrae los parametros que vienen en la URL después del ? por ejemplo ?status=pending

import { TasksService } from './Tasks.services';
// se importa el service que contiene toda la logica de negocio de tareas

import { CreateTaskDto, UpdateTaskDto } from '../DTOs/Tasks/Task.dto';
// se importan los DTOs que definen que datos se esperan recibir

import { JwtAuthGuard } from '../Context/jwt-auth.guard';
// se importa el guard que verifica que el usuario tenga un token JWT válido

import { TaskStatus } from '../Models/Task.entity';
// se importa el enum TaskStatus para usarlo en el filtro por status

@Controller('api/tasks')
// define la ruta base de este controlador, todas las rutas empezarán con api/tasks
export class TasksController {

    constructor(
        private readonly tasksService: TasksService
        // inyecta el service, readonly significa que no se puede reasignar después
    ) {}

    @UseGuards(JwtAuthGuard)
    // verifica que el usuario tenga un token JWT válido antes de ejecutar la función
    @Get()
    // responde a peticiones GET en api/tasks
    async getTasks(@Request() req, @Query('status') status?: TaskStatus, @Query('categoryId') categoryId?: string) {
    // @Request() req contiene la informacion del usuario autenticado del token
    // @Query('status') extrae el parametro status de la URL

        const userId = req.user.id;
        // id del usuario extradio del token JWT

        if (status) {
        // si el usuario envio un filtro de status en la URL
            return this.tasksService.findByStatus(userId, status);
            // llama al service para traer solo las tareas con ese status
        }

        if (categoryId) {
        // si el usuario envio un filtro de categoryId en la URL
            return this.tasksService.findByCategory(userId, categoryId);
            // llama al service para traer solo las tareas de esa categoría
        }

        return this.tasksService.findAll(userId);
        // si no hay filtros, trae todas las tareas del usuario
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    // responde a GET en api/tasks/:id, el :id es un parametro variable en la URL
    async getTask(@Param('id') id: string, @Request() req) {
    // @Param('id') extrae el valor del :id que viene en la URL

        const userId = req.user.id;
        return this.tasksService.findOne(id, userId);
        // llama al service con el id de la tarea y el userId del usuario
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    // responde a peticiones POST en api/tasks
    async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    // @Body() createTaskDto extrae los datos del cuerpo de la petición y los mapea al DTO

        const userId = req.user.id;
        return this.tasksService.create(createTaskDto, userId);
        // llama al service con los datos del DTO y el userId del usuario autenticado
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    // responde a peticiones PUT en api/tasks/:id
    async updateTask(
        @Param('id') id: string,
        // id de la tarea a actualizar que viene en la URL
        @Body() updateTaskDto: UpdateTaskDto,
        // nuevos datos de la tarea que vienen en el cuerpo de la petición
        @Request() req
        // petición HTTP para obtener el usuario autenticado
    ) {
        const userId = req.user.id;
        return this.tasksService.update(id, updateTaskDto, userId);
        // llama al service con el id, los nuevos datos y el userId
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    // responde a peticiones DELETE en api/tasks/:id
    async deleteTask(@Param('id') id: string, @Request() req) {

        const userId = req.user.id;
        await this.tasksService.remove(id, userId);
        // await espera a que el service termine de eliminar antes de continuar

        return { mensaje: 'Tarea eliminada exitosamente' };
        // devuelve un mensaje de confirmación con status 200
    }
}