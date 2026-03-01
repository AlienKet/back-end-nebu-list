
// Esta clase es la encargada de hablar directamente con la base de datos
// El controller llama a este archivo para obtener, crear, actualizar y eliminar categorias

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// Injectable: permite que esta clase se pueda inyectar en otros archivos
// NotFoundException: lanza un error 404 cuando no se encuentra un registro
// BadRequestException : lanza un error 400 cuando los datos enviados son incorrectos

import { InjectRepository } from '@nestjs/typeorm';
// InjectRepository:conecta esta clase con la tabla Categories de la base de datos

import { Repository } from 'typeorm';
// Repository:es el que contiene los métodos para hacer consultas a la BD

import { Category } from '../Models/Category.entity';
// se importa la entidad Category para indicar con qué tabla vse trabajara

import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../DTOs/Categories/Category.dto';
// se importan los DTOs que definen que datos se van a recibir y cuales a devolver

@Injectable() // marca esta clase como un servicio que puede ser inyectado en el controller
export class CategoriesService {

    constructor(
        @InjectRepository(Category) // inyecta el repositorio de la tabla Categories
        private categoryRepository: Repository<Category>, // variable para hacer consultas a la tabla Categories
    ) {} // constructor vacío, NestJS se encarga de inyectar las dependencias automáticamente

   //obtener categorias
    async findAll(userId: string): Promise<CategoryDto[]> {
    // async:es una funcion asincrona porque espera respuesta de la base de datos
    // userId:recibe el id del usuario para traer solo sus categorias
    // Promise<CategoryDto[]>: promete devolver una lista de CategoryDto cuando termine

        const categories = await this.categoryRepository.find({
        // find():busca todos los registros que cumplan las condiciones indicadas
        // await :espera a que la base de datos responda antes de continuar
            where: { userId },              // condición: solo categorias de este usuario
            order: { createdAt: 'DESC' },   // ordena de la más reciente a la más antigua
        });

        return categories.map(cat => this.toDto(cat));
        // map():recorre cada elemento de la lista y aplica una función
        // toDto() : convierte cada Category al formato CategoryDto para la respuesta
    }

    //obtener una sola categoria─
    async findOne(id: string, userId: string): Promise<CategoryDto> {
    // id : identificador unico de la categoria que se busca
    // userId : verifica que la categoria pertenezca al usuario autenticado

        const category = await this.categoryRepository.findOne({
        // findOne() : busca un solo registro, devuelve null si no existe
            where: { id, userId }
            // busca por id y userId para que un usuario no acceda a categoris de otro
        });

        if (!category) {
        // si category es null, el registro no existe en la base de datos
            throw new NotFoundException('categoria no encontrada');
            // throw : lanza el error, detiene la ejecucion y devuelve status 404
        }

        return this.toDto(category); // convierte Category : CategoryDto y lo devuelve
    }

   
    // Crear una nueva categoria

    async create(createCategoryDto: CreateCategoryDto, userId: string): Promise<CategoryDto> {
    // createCategoryDto : contiene los datos enviados por el usuario para crear la categoria
    // userId : id del usuario autenticado que esta creando la categoria

        const existe = await this.categoryRepository.findOne({
        // verifica si ya existe una categoria con el mismo nombre para este usuario
            where: {
                name: createCategoryDto.name, // compara con el nombre enviado
                userId                         // solo busca entre las categorias de este usuario
            }
        });

        if (existe) {
        // si existe, no se permite crear otra con el mismo nombre
            throw new BadRequestException('Ya existe una categoria con ese nombre');
            // lanza error 400 indicando que el nombre ya está en uso
        }

        const category = this.categoryRepository.create({
        // create() : arma el objeto Category con los datos proporcionados
        // en este punto aún no se guarda en la base de datos
            ...createCategoryDto,   // 
            userId,                 // agrega el userId del usuario autenticado como dueño
        });

        const saved = await this.categoryRepository.save(category);
        // save() : guarda el objeto en la base de datos y devuelve el registro con su id generado

        return this.toDto(saved); // convierte el registro guardado a CategoryDto y lo devuelve
    }

        //actualizar categoria
    async update(id: string, updateCategoryDto: UpdateCategoryDto, userId: string): Promise<CategoryDto> {
    // id : id de la categoria que se va a actualizar
    // updateCategoryDto : contiene los nuevos datos enviados por el usuario
    // userId : verifica que la categoria pertenezca al usuario autenticado

        const category = await this.categoryRepository.findOne({
            where: { id, userId } // busca la categoria que coincida con id y userId
        });

        if (!category) {
            throw new NotFoundException('categoria no encontrada'); 
        }

        if (updateCategoryDto.name &&
        // verifica que se haya enviado un nombre nuevo en la petición
            updateCategoryDto.name.toLowerCase() !== category.name.toLowerCase()) {
            // toLowerCase() : convierte a minúsculas para comparar sin importar mayúsculas
            // solo valida duplicado si el nombre realmente cambió

            const existe = await this.categoryRepository.findOne({
                where: { name: updateCategoryDto.name, userId }
                // busca si ya existe otra categoria con ese nombre para este usuario
            });

            if (existe) {
                throw new BadRequestException('Ya existe una categoria con ese nombre');
                // error 400 si el nuevo nombre ya está en uso por otra categoria
            }
        }

        Object.assign(category, updateCategoryDto);
        // Object.assign : fusiona los valores del DTO sobre el objeto category
        // solo sobreescribe los campos que llegaron en el DTO, los demás quedan igual

        const updated = await this.categoryRepository.save(category);
        // save() con un objeto que ya tiene id genera un update en la base de datos

        return this.toDto(updated); // devuelve la categoria actualizada como CategoryDto
    }

        //eliminar categoria
    async remove(id: string, userId: string): Promise<void> {
    // Promise<void> : esta función no devuelve ningiun dato al terminar

        const category = await this.categoryRepository.findOne({
            where: { id, userId } // busca la categoria por id y userId
        });

        if (!category) {
            throw new NotFoundException('categoria no encontrada'); // error 404 si no existe
        }

        await this.categoryRepository.remove(category);
        // remove() : elimina el registro de la base de datos definitivamente
    }

 
    // Conviertir un objeto Category a CategoryDto
    // Se usa para controlar que datos se devuelven en la respuesta

    private toDto(category: Category): CategoryDto {
    // private : este método solo se puede usar dentro de este archivo
    // recibe un objeto Category completo y devuelve solo los campos necesarios

        const dto = new CategoryDto(); // crea un objeto CategoryDto vacío
        dto.id = category.id;                   // asigna el id
        dto.name = category.name;               // asigna el nombre
        dto.description = category.description;
        dto.color = category.color;           
        dto.icon = category.icon;             
        dto.createdAt = category.createdAt;    
        dto.userId = category.userId;           
        return dto; // devuelve el DTO listo para enviar como respuesta
    }
}