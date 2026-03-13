import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

export class CategoryDto {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  createdAt: Date;
  userId: string;
}

export class CreateCategoryDto {
  @ApiProperty({ example: 'Escuela' })
  @IsString()
  @Length(1, 80)
  name: string;

  @ApiProperty({ example: 'Tareas de la escuela', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '#a78bfa', required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: '🏫', required: false })
  @IsOptional()
  @IsString()
  icon?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Escuela', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  icon?: string;
}