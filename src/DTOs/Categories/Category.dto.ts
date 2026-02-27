//un dto es un objeto que transporta datos entre procesos. 

// DTO de respuesta
export class CategoryDto {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    createdAt: Date;
    userId: string;
}

// DTO para crear una categoría
export class CreateCategoryDto {
    name: string;
    description?: string;    // ? significa que es opcional
    color?: string;
    icon?: string;
}

// DTO para actualizar una categoría
export class UpdateCategoryDto {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
}