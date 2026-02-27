
//esta es la entidad de la tabla categoria

import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
//este import es para importar las decoraciones de TypeORM, que son las que se utilizan para definir la entidad y sus propiedades
//Entity es para definir la entidad, PrimaryGeneratedColumn es para definir la columna de id, Column es para definir las columnas de la tabla, CreateDateColumn es para definir la columna de fecha de creación, ManyToOne es para definir la relación de muchos a uno, JoinColumn es para definir la columna de unión, OneToMany es para definir la relación de uno a muchos

import {User} from './User.entity';
import { Task } from './Task.entity';

@Entity('Categories')//esto es para definir la entidad
export class Category {//esto es para exportar la clase de la entidad

    //el @ es para declarar los atributos de la clase

@PrimaryGeneratedColumn('uuid')//esto es para definir la columna de id
id: string;   //uuid es un tipo de dato que se utiliza para generar identificadores únicos, es una cadena de texto que se genera de forma aleatoria y tiene una longitud de 36 caracteres

@Column({length: 80})//esto es para definir la columna de nombre
name: string;

@Column({length: 255,nullable: true})//esto es para definir la columna de descripción
description: string;

@Column({length: 8,nullable:true})//esto es para definir la columna de color,
color: string;

@Column({length: 10, nullable: true})//esto es para definir la columna de icono, nullable es para permitir que esta columna sea nula
icon: string;

@CreateDateColumn()//esto es para definir la columna de fecha de creación   
createdAt: Date;

//relacion con user (quien creo la categoria)

@Column({ })//aqui se define la columna de userId, que es la clave foranea que se utiliza para relacionar la tabla de categorias con la tabla de usuarios
    userId: string;

    @ManyToOne(() => User, user => user.categories)//aqui es muchos a uno, es decir, muchas categorias pueden ser creadas por un mismo usuario
    //User es la entidad a la que se va a relacionar, user es el alias de la entidad, categories es el nombre de la propiedad que se va a utilizar para acceder a las categorias desde el usuario
    @JoinColumn({ name: 'userId' })//esto es para definir la columna que se usara para relacionar las tablas
    user: User;

    //relacion con task

    @OneToMany(() => Task, task => task.category)//aqui es uno a muchos, es decir, una categoria puede tener muchas tareas
    tasks: Task[];

}