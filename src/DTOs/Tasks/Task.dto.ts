import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { TaskStatus, TaskPriority } from '../../Models/Task.entity';

// DTO de respuesta: Este es el que te faltaba y causaba el error de importación
export class TaskDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string | null;

  @ApiProperty()
  status!: TaskStatus;

  @ApiProperty()
  priority!: TaskPriority;

  @ApiProperty()
  dueDate!: Date | null;//fecha de vencimiento, puede ser null si no se establece

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty()
  userId!: number;

  @ApiProperty()
  categoryId!: number | null;
}


export class CreateTaskDto {
  @ApiProperty({ example: 'Lunes' })
  @IsString()
  @IsNotEmpty() 
  title!: string;

  @ApiPropertyOptional({ example: 'Pecho' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: TaskStatus, default: TaskStatus.PENDING })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ enum: TaskPriority, default: TaskPriority.MEDIUM })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({ example: '2026-04-29T00:39:07.074Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}

// PartialType es una función de NestJS que toma un DTO y lo convierte en otro DTO donde todas las propiedades son opcionales
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}