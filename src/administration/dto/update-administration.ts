import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDateString, ValidateNested } from 'class-validator';
import { CreateContactDto } from 'src/contact/dto/create-contact';
import { CreateHoraireDto } from 'src/horaire/dto/create-horaire';
import { CreateServiceDto } from 'src/service/dto/create-service';

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

  @ApiPropertyOptional({ type: [String], description: 'Images supplémentaires de l’administration' })
  @IsOptional()
  images?: string[];

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

  @ApiPropertyOptional({ type: [CreateContactDto], description: 'Liste des contacts' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  contacts?: CreateContactDto[];

  @ApiPropertyOptional({ type: [CreateHoraireDto], description: 'Liste des horaires' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateHoraireDto)
  horaires?: CreateHoraireDto[];

  @ApiPropertyOptional({ type: [CreateServiceDto], description: 'Liste des services' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  services?: CreateServiceDto[];
}


