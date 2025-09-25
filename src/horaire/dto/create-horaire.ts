import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID, IsDateString } from 'class-validator';

export enum JourSemaine {
  LUNDI = 'LUNDI',
  MARDI = 'MARDI',
  MERCREDI = 'MERCREDI',
  JEUDI = 'JEUDI',
  VENDREDI = 'VENDREDI',
  SAMEDI = 'SAMEDI',
}

export class CreateHoraireDto {

@ApiProperty({ 
    description: 'les jours de la semaine ' })
  @IsEnum(JourSemaine)
  jour: JourSemaine;

  @ApiProperty({ 
    description: 'les heures douvertures ' })
  @IsDateString()
  heureOuverture: string;

  @ApiProperty({ 
    description: 'les heures de fermetures ' })
  @IsDateString()
  heureFermeture: string;

  @IsUUID()
  administrationId: string;
}
