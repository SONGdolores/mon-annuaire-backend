import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateVilleDto {
  @ApiProperty({
    description: 'Nom de la ville',
  })
  @IsString({ message: 'Le nom de la ville doit être renseigné' })
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  nom: string;

}