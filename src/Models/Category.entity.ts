
//esta es la entidad de la tabla categoria

import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
//este import es para importar las decoraciones de TypeORM, que son las que se utilizan para definir la entidad y sus propiedades
//Entity es para definir la entidad, PrimaryGeneratedColumn es para definir la columna de id, Column es para definir las columnas de la tabla, CreateDateColumn es para definir la columna de fecha de creación, ManyToOne es para definir la relación de muchos a uno, JoinColumn es para definir la columna de unión, OneToMany es para definir la relación de uno a muchos

import {User} from './User.entity';
import { Task } from './Task.entity';

@Entity('Categories')//esto es para definir la entidad
export class Category {//esto es para exportar la clase de la entidad

    //el @ es para declarar los atributos de la clase

@PrimaryGeneratedColumn()//esto es para definir la columna de id
id!: number;   

@Column({length: 80})//esto es para definir la columna de nombre
name!: string;

@Column({ type: 'varchar', length: 255, nullable: true })
    description!: string | null;

    @Column({ type: 'varchar', length: 8, nullable: true })
    color!: string | null;

    @Column({ type: 'varchar', length: 10, nullable: true })
    icon!: string | null;

@CreateDateColumn()//esto es para definir la columna de fecha de creación   
createdAt!: Date;

//relacion con user (quien creo la categoria)

@Column({ })//aqui se define la columna de userId, que es la clave foranea que se utiliza para relacionar la tabla de categorias con la tabla de usuarios
    userId!: number;

    @ManyToOne(() => User, user => user.categories)//aqui es muchos a uno, es decir, muchas categorias pueden ser creadas por un mismo usuario
    //User es la entidad a la que se va a relacionar, user es el alias de la entidad, categories es el nombre de la propiedad que se va a utilizar para acceder a las categorias desde el usuario
    @JoinColumn({ name: 'userId' })//esto es para definir la columna que se usara para relacionar las tablas
    user!: User;

    //relacion con task

    @OneToMany(() => Task, task => task.category)//aqui es uno a muchos, es decir, una categoria puede tener muchas tareas
    tasks!: Task[];

}