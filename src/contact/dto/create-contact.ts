import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsUUID } from 'class-validator';
import { ContactType } from '@prisma/client';

export class CreateContactDto {
  @ApiProperty({
    description: 'Libellé du contact',
  })
  @IsString({ message: 'Le libellé doit être renseigné' })
  @IsNotEmpty({ message: 'Le libellé est obligatoire' })
  libelle: string;

  @ApiProperty({
    description: 'Type du contact',
    enum: ContactType,
  })
  @IsEnum(ContactType, {
    message: 'Le type doit être l’une des valeurs suivantes : Telephone, Email, Fax, Autre',
  })
  type: ContactType;
  
    @IsUUID()
    administrationId: string;
}
