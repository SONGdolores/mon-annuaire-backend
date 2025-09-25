import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class UpdateAdministrationDto {
  @ApiProperty({ description: 'Nom de l’administration' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiPropertyOptional({ description: 'Ministère de tutelle' })
  @IsOptional()
  @IsString()
  ministereDeTutelle?: string;

  @ApiProperty({ description: 'Mission de l’administration' })
  @IsString()
  @IsNotEmpty()
  mission: string;

    @ApiProperty({
    description: 'chiffre correspondant a la longitude',
  })
  @IsString({ message: 'La longitude doit être renseignée' })
  @IsNotEmpty({ message: 'La longitude est obligatoire' })
  longitude: number;

   @ApiProperty({
    description: 'chiffre correspondant a la latitude',
  })
  @IsString({ message: 'La latitude doit être renseignée' })
  @IsNotEmpty({ message: 'La latitude est obligatoire' })
  latitude: number;

   @ApiProperty({
    description: 'nom du quartier',
  })
  @IsString({ message: 'le nom du quartier doit être renseigné' })
  @IsNotEmpty({ message: 'Le nom du quartier est obligatoire' })
  quartier: string;

   @ApiPropertyOptional({ description: 'la page de couverture' })
  @IsOptional()
  @IsString()
  cover?: string;

  @ApiPropertyOptional({ description: 'ID de l’adresse associée' })
  @IsOptional()
  @IsUUID()
  adresseId?: string;

  @ApiPropertyOptional({ description: 'ID de la ville associée' })
  @IsOptional()
  @IsUUID()
  villeId?: string;

  @ApiPropertyOptional({ description: 'ID du type d’administration associé' })
  @IsOptional()
  @IsUUID()
  typeAdministrationId?: string;
}
