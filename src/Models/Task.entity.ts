//este es la entidad para la tabla de tareas

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';
import { Category } from './Category.entity';

// enums
export enum TaskStatus {
    PENDING = 'Pendiente',//pendiente
    IN_PROGRESS = 'En Progreso', //en progreso
    COMPLETED = 'Completado',//completado
}

export enum TaskPriority {
    LOW = 'Baja',//baja
    MEDIUM = 'Media',//media
    HIGH = 'Alta',//alta
}

@Entity('Tasks')//esto es para definir la entidad(nombre de la tabla)
export class Task {

    @PrimaryGeneratedColumn()
    id!: number;                       

    @Column({ length: 150 })
    title!: string;                     

    @Column({ type: 'text', nullable: true })
    description?: string;               

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
    status!: TaskStatus;                

    @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
    priority!: TaskPriority;           

    @Column({ type: 'date', nullable: true })
    dueDate!: Date;    //dueDate es la fecha de vencimiento de la tarea                 

    @CreateDateColumn()
    createdAt!: Date;                  

    @UpdateDateColumn()
    updatedAt!: Date;                 

    // Relaciones
    @Column({ })//la tarea es creada por un usuario
    userId!: number;

@ManyToOne(() => User, user => user.tasks) //aqui es muchos a uno, es decir, muchas tareas pueden ser creadas por un mismo usuario
@JoinColumn({ name: 'userId' })//esto es para definir la columna que se usara para relacionar las tablas
user!: User;

@Column({ nullable: true })
categoryId!: number;    //porque una tarea puede no tener categoría

@ManyToOne(() => Category, category => category.tasks)//aqui es muchos a uno, es decir, muchas tareas pueden pertenecer a una misma categoría
@JoinColumn({ name: 'categoryId' })//esto es para definir la columna que se usara para relacionar las tablas
category!: Category;

}