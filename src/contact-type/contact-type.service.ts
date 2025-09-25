import { Injectable } from '@nestjs/common';
import { ContactType } from '@prisma/client';

@Injectable()
export class ContactTypeService {
  
  findAll(): string[] {
    return Object.values(ContactType);
  }

  isValid(type: string): boolean {
    return Object.values(ContactType).includes(type as ContactType);
  }
}
