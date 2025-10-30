import { CreateMembreDsciDto } from './dto/create-membre-dsci.dto';
import { UpdateMembreDsciDto } from './dto/update-membre-dsci.dto';
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MembreDsciService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMembreDsciDto) {
    try {
      const membre = await this.prisma.dcsiMembre.create({
        data: {
          nom: dto.nom,
          email: dto.email,
          phone: dto.phone,
          fonction: dto.fonction,
          dcsiId: dto.dcsiId,
        },
        include: { dcsi: true },
      });
      return membre;
    } catch (e: any) {
      if (e.code === "P2003") {
        // violation de clé étrangère
        throw new ConflictException("Le DCSI associé est invalide.");
      }
      throw new InternalServerErrorException("Erreur lors de la création du membre du DCSI.");
    }
  }

  async findAll() {
    return this.prisma.dcsiMembre.findMany({
      include: { dcsi: true },
      orderBy: { nom: "asc" },
    });
  }

  async findOne(id: string) {
    const membre = await this.prisma.dcsiMembre.findUnique({
      where: { id },
      include: { dcsi: true },
    });
    if (!membre) throw new NotFoundException("Membre introuvable.");
    return membre;
  }

  async update(id: string, dto: UpdateMembreDsciDto) {
    try {
      const updated = await this.prisma.dcsiMembre.update({
        where: { id },
        data: dto,
        include: { dcsi: true },
      });
      return updated;
    } catch (e: any) {
      if (e.code === "P2025") throw new NotFoundException("Membre introuvable.");
      throw new InternalServerErrorException("Erreur lors de la mise à jour du membre du DCSI.");
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.dcsiMembre.delete({
        where: { id },
      });
    } catch (e: any) {
      if (e.code === "P2025") throw new NotFoundException("Membre introuvable.");
      throw new InternalServerErrorException("Erreur lors de la suppression du membre du DCSI.");
    }
  }
}
