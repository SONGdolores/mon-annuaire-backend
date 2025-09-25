import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ContactType } from '@prisma/client';

export class ContactTypeDto {
  @ApiProperty({
    description: 'Type de contact',
    enum: ContactType,
  })
  @IsEnum(ContactType, {
    message: 'Le type de contact doit être renseigné',
  })
  type: ContactType;
}
