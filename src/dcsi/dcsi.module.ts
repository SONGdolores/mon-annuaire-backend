import { Module } from "@nestjs/common";
import { DcsiService } from "./dcsi.service";
import { DcsiController } from "./dcsi.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [DcsiController],
  providers: [DcsiService, PrismaService],
})
export class DcsiModule {}
