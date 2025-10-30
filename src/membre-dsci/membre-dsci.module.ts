import { Module } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { MembreDsciService } from './membre-dsci.service';
import { MembreDsciController } from './membre-dsci.controller';

@Module({
  controllers: [MembreDsciController],
  providers: [MembreDsciService],
})
export class MembreDsciModule {}


