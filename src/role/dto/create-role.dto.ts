import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsString,IsNotEmpty,IsOptional,IsArray,ArrayNotEmpty} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Le nom du rôle (obligatoire)',
  })
  @IsString()
  @IsNotEmpty()
  nom: string;

   @ApiProperty({
    example: 'Admin',
    description: 'Code unique du rôle ',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional({
    description: 'Description du rôle',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: [
      '3f9c83e0-7b8a-11ec-90d6-0242ac120003',
      '3f9c842e-7b8a-11ec-90d6-0242ac120003',
    ],
    description: 'Liste des Ids des permissions associées',
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  permissions: string[];
}
