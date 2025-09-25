import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PrismaService], // Assure-toi que PrismaClient est là
})
export class PermissionModule {}
