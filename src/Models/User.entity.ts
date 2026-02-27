
//entidad de la tabla de usuarios
//una entidad es una clase que representa una tabla en la base de datos, y cada propiedad de la clase representa una columna en la tabla

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Category } from './Category.entity';
import { Task } from './Task.entity';

@Entity('Users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;                   

    @Column({ length: 50 })
    username: string;             

    @Column({ length: 100, unique: true })
    email: string;                

    @Column({ type: 'text' })
    passwordHash: string;          

    @CreateDateColumn()
    createdAt: Date;              

    @Column({ default: true })
    isActive: boolean;           

    // Relaciones
    @OneToMany(() => Category, category => category.user)
    categories: Category[];

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];
}