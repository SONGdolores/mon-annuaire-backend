import { Module } from '@nestjs/common';
import { TypeAdministrationController } from './type-administration.controller';
import { TypeAdministrationService } from './type-administration.service';

@Module({
  controllers: [TypeAdministrationController],
  providers: [TypeAdministrationService]
})
export class TypeAdministrationModule {}
