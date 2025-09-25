import { Module } from '@nestjs/common';
import { VilleController } from './ville.controller';
import { VilleService } from './ville.service';

@Module({
  controllers: [VilleController],
  providers: [VilleService]
})
export class VilleModule {}
