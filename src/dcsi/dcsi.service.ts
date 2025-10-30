import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDcsiDto } from "./dto/create-dcsi.dto";
import { UpdateDcsiDto } from "./dto/update-dcsi.dto";

@Injectable()
export class DcsiService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDcsiDto) {
    try {
      const dcsi = await this.prisma.dcsi.create({
        data: {
          responsableNom: dto.responsableNom,
          responsableEmail: dto.responsableEmail,
          responsablePhone: dto.responsablePhone,
          chefServiceNom: dto.chefServiceNom,
          chefServiceEmail: dto.chefServiceEmail,
          chefServicePhone: dto.chefServicePhone,
          administrationId: dto.administrationId,
        },
        include: { administration: true, membres: true },
      });
      return dcsi;
    } catch (e: any) {
      if (e.code === "P2003") {
        
        throw new ConflictException("L'administration spécifiée est invalide.");
      }
      throw new InternalServerErrorException("Erreur lors de la création du DCSI.");
    }
  }

  async findAll() {
    return this.prisma.dcsi.findMany({
      include: { administration: true, membres: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const dcsi = await this.prisma.dcsi.findUnique({
      where: { id },
      include: { administration: true, membres: true },
    });
    if (!dcsi) throw new NotFoundException("DCSI introuvable.");
    return dcsi;
  }

  async update(id: string, dto: UpdateDcsiDto) {
    try {
      const updated = await this.prisma.dcsi.update({
        where: { id },
        data: dto,
        include: { administration: true, membres: true },
      });
      return updated;
    } catch (e: any) {
      if (e.code === "P2025") throw new NotFoundException("DCSI introuvable.");
      throw new InternalServerErrorException("Erreur lors de la mise à jour du DCSI.");
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.dcsi.delete({
        where: { id },
      });
    } catch (e: any) {
      if (e.code === "P2025") throw new NotFoundException("DCSI introuvable.");
      throw new InternalServerErrorException("Erreur lors de la suppression du DCSI.");
    }
  }
}

