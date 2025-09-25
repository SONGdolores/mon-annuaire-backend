import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHoraireDto } from './dto/create-horaire';
import { UpdateHoraireDto } from './dto/update-horaire';


@Injectable()
export class HoraireService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateHoraireDto) {
    try {
      return await this.prisma.horaire.create({ data: dto });
    } catch (e) {
      throw new InternalServerErrorException('Erreur lors de la création de l’horaire.');
    }
  }

  async findAll() {
    return this.prisma.horaire.findMany({
      include: { administration: true },
      orderBy: { jour: 'asc' },
    });
  }

  async findOne(id: string) {
    const horaire = await this.prisma.horaire.findUnique({
      where: { id },
      include: { administration: true },
    });
    if (!horaire) throw new NotFoundException('Horaire introuvable');
    return horaire;
  }

  async update(id: string, dto: UpdateHoraireDto) {
    try {
      return await this.prisma.horaire.update({
        where: { id },
        data: dto,
      });
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Horaire introuvable');
      throw new InternalServerErrorException('Erreur lors de la mise à jour de l’horaire.');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.horaire.delete({ where: { id } });
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Horaire introuvable');
      throw new InternalServerErrorException('Erreur lors de la suppression de l’horaire.');
    }
  }
}
