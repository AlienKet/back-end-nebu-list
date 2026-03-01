// esta clase contiene toda la lógica de las tareas
// es el que se comunica directamente con la base de datos

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// Injectable permite que esta clase se pueda usar en otros archivos
// NotFoundException lanza un error 404 cuando no se encuentra un registro
// BadRequestException lanza un error 400 cuando los datos enviados son incorrectos

import { InjectRepository } from '@nestjs/typeorm';
// InjectRepository conecta esta clase con la tabla Tasks de la base de datos

import { Repository } from 'typeorm';
// Repository es la clase que tiene los metodos para hacer consultas a la base de datos

import { Task, TaskStatus, TaskPriority } from '../Models/Task.entity';
// Task es la entidad que representa la tabla Tasks en la base de datos
// TaskStatus y TaskPriority son los enums que definen los valores posibles de status y priority

import { Category } from '../Models/Category.entity';
// Category se importa para verificar que la categoria exista y pertenezca al usuario

import { TaskDto, CreateTaskDto, UpdateTaskDto } from '../DTOs/Tasks/Task.dto';
// se importan los DTOs que definen que datos se recibiran  y que datos se devolveran

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        // taskRepository es para hacer consultas a la tabla Tasks

        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        // categoryRepository es para verificar que la categoria exista antes de asignarla a una tarea
    ) {}

    async findAll(userId: string): Promise<TaskDto[]> {
    // async porque espera respuesta de la base de datos
    // userId recibe el id del usuario para traer solo sus tareas
    // Promise<TaskDto[]> promete devolver una lista de TaskDto cuando termine

        const tasks = await this.taskRepository.find({
        // find() busca todos los registros que cumplan las condiciones
            where: { userId },
            // filtra solo las tareas que pertenecen a este usuario
            order: { createdAt: 'DESC' },
            // ordena de la más reciente a la más antigua
        });

        return tasks.map(task => this.toDto(task));
        // map() recorre cada tarea y la convierte a TaskDto usando el metodo toDto
    }

    async findOne(id: string, userId: string): Promise<TaskDto> {
    // id es el identificador único de la tarea que se busca
    // userId verifica que la tarea pertenezca al usuario autenticado

        const task = await this.taskRepository.findOne({
        // findOne() busca un solo registro, devuelve null si no existe
            where: { id, userId }
            // busca por id Y userId para que un usuario no acceda a tareas de otro
        });

        if (!task) {
        // si task es null significa que no se encontro en la base de datos
            throw new NotFoundException('Tarea no encontrada');
            // throw lanza el error y detiene la ejecucion, devuelve status 404
        }

        return this.toDto(task);
        // convierte el objeto Task a TaskDto y lo devuelve
    }

    async findByStatus(userId: string, status: TaskStatus): Promise<TaskDto[]> {
    // este metodo permite filtrar las tareas por su estado
    // por ejemplo, traer solo las tareas pendientes o completadas

        const tasks = await this.taskRepository.find({
            where: { userId, status },
            // filtra por userId y por el status que se recibe como parametro
            order: { createdAt: 'DESC' },
        });

        return tasks.map(task => this.toDto(task));
    }

    async findByCategory(userId: string, categoryId: string): Promise<TaskDto[]> {
    // este metodo permite traer todas las tareas que pertenecen a una categoria especifica

        const tasks = await this.taskRepository.find({
            where: { userId, categoryId },
            // filtra por userId y por el categoryId que se recibe como parametro
            order: { createdAt: 'DESC' },
        });

        return tasks.map(task => this.toDto(task));
    }

    async create(createTaskDto: CreateTaskDto, userId: string): Promise<TaskDto> {
    // createTaskDto contiene los datos enviados por el usuario para crear la tarea
    // userId es el id del usuario autenticado que está creando la tarea

        if (createTaskDto.categoryId) {
        // si el usuario envió un categoryId, verificamos que esa categoria exista y le pertenezca
            const category = await this.categoryRepository.findOne({
                where: { id: createTaskDto.categoryId, userId }
                // busca la categoria por id y userId para confirmar que es del mismo usuario
            });

            if (!category) {
                throw new BadRequestException('La categoria no existe o no te pertenece');
                // lanza error 400 si la categoria no existe o es de otro usuario
            }
        }

        const task = this.taskRepository.create({
        // create() arma el objeto Task con los datos proporcionados
        // en este momento aún no se guarda en la base de datos
            ...createTaskDto,
            // los 3 puntos se llama spread operator: copia todos los campos del DTO (title, description, etc.)
            userId,
            // agrega el userId del usuario autenticado como dueño de la tarea
            status: createTaskDto.status ?? TaskStatus.PENDING,
            // ?? significa "si status viene vacio, usa PENDING por defecto"
            priority: createTaskDto.priority ?? TaskPriority.MEDIUM,
            // si priority viene vacío, usa MEDIUM por defecto
        });

        const saved = await this.taskRepository.save(task);
        // save() guarda el objeto en la base de datos y devuelve el registro con su id generado

        return this.toDto(saved);
        // convierte el registro guardado a TaskDto y lo devuelve
    }

    async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<TaskDto> {
    // id es el id de la tarea que se va a actualizar
    // updateTaskDto contiene los nuevos datos enviados por el usuario
    // userId verifica que la tarea pertenezca al usuario autenticado

        const task = await this.taskRepository.findOne({
            where: { id, userId }
            // busca la tarea por id y userId
        });

        if (!task) {
            throw new NotFoundException('Tarea no encontrada');
            // error 404 si la tarea no existe o no pertenece al usuario
        }

        if (updateTaskDto.categoryId) {
        // si el usuario quiere cambiar la categoria, verificamos que la nueva categoria exista
            const category = await this.categoryRepository.findOne({
                where: { id: updateTaskDto.categoryId, userId }
            });

            if (!category) {
                throw new BadRequestException('La categoria no existe o no te pertenece');
            }
        }

        Object.assign(task, updateTaskDto);
        // Object.assign fusiona los valores del DTO sobre el objeto task
        // solo sobreescribe los campos que llegaron en el DTO, los demás quedan igual

        const updated = await this.taskRepository.save(task);
        // save() con un objeto que ya tiene id genera un UPDATE en la base de datos

        return this.toDto(updated);
        // devuelve la tarea actualizada como TaskDto
    }

    async remove(id: string, userId: string): Promise<void> {
    // Promise<void> significa que esta función no devuelve ningún dato al terminar

        const task = await this.taskRepository.findOne({
            where: { id, userId }
            // busca la tarea por id y userId
        });

        if (!task) {
            throw new NotFoundException('Tarea no encontrada');
            // error 404 si la tarea no existe
        }

        await this.taskRepository.remove(task);
        // remove() elimina el registro de la base de datos definitivamente
    }

    private toDto(task: Task): TaskDto {
    // private significa que este metodo solo se puede usar dentro de este archivo
    // recibe un objeto Task completo y devuelve solo los campos necesarios del DTO

        const dto = new TaskDto();
        // crea un objeto TaskDto vacío para ir llenando con los datos
        dto.id = task.id;
        // asigna el id de la tarea
        dto.title = task.title;
        dto.description = task.description;
        dto.status = task.status;
        dto.priority = task.priority;
        dto.dueDate = task.dueDate;
        dto.createdAt = task.createdAt;
        dto.updatedAt = task.updatedAt;
        dto.userId = task.userId;
        dto.categoryId = task.categoryId;
        return dto;
        // devuelve el DTO listo para enviar como respuesta
    }
}