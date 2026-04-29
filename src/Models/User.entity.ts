import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Category } from './Category.entity';
import { Task } from './Task.entity';

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()//esto es para definir la columna de id
    id!: number;                   

    @Column({ length: 50 })
    username!: string;             

    @Column({ length: 100, unique: true })
    email!: string;                

    @Column({ type: 'text' })
    passwordHash!: string;          

    @CreateDateColumn()
    createdAt!: Date;              

    @Column({ default: true })
    isActive!: boolean;           

    @OneToMany(() => Category, category => category.user)
    categories!: Category[];

    @OneToMany(() => Task, task => task.user)
    tasks!: Task[];
}