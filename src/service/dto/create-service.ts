import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Description du service',
  })
  @IsString({ message: 'La description doit être renseignée' })
  @IsNotEmpty({ message: 'La description est obligatoire' })
  description: string;

   @IsUUID()
      administrationId: string;
  }
