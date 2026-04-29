import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
// ApiProperty se usa para documentar cada propiedad en Swagger, indicando su tipo y si es opcional o no
//ApiPropertyOptional se usa para propiedades opcionales

import { IsString, IsOptional, Length } from 'class-validator';
// IsString se usa para validar que el valor sea una cadena de texto
// IsOptional se usa para validar que la propiedad es opcional, es decir, que puede estar ausente o ser null
// Length se usa para validar que la longitud de una cadena esté dentro de un rango específico
export class CategoryDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  description!: string | null;

  @ApiPropertyOptional()
  color!: string | null;

  @ApiPropertyOptional()
  icon!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  userId!: number;
}

export class CreateCategoryDto {
  @ApiProperty({ example: 'Escuela' })
  @IsString()
  @Length(1, 80)
  name!: string;

  @ApiPropertyOptional({ example: 'Tareas de la escuela' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '#a78bfa' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: '🏫' })
  @IsOptional()
  @IsString()
  icon?: string;
}

// PartialType es una función de NestJS que toma un DTO y lo convierte en otro DTO donde todas las propiedades son opcionales
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}