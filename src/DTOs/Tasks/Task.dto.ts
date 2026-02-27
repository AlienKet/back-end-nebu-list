
import { TaskStatus, TaskPriority } from '../../Models/Task.entity';//se importa los enums

// DTO de respuesta 
export class TaskDto {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    categoryId: string;
}

// DTO para crear una tarea
export class CreateTaskDto {
    title: string;
    description?: string;       // opcional
    status?: TaskStatus;        
    priority?: TaskPriority;    
    dueDate?: Date;             // opcional, puede no tener fecha limite
    categoryId?: string;        // opcional, puede no tener categoria
}

// DTO para actualizar una tarea
export class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: Date;
    categoryId?: string;
}