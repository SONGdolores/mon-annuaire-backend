import {Injectable,NotFoundException,ConflictException,InternalServerErrorException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVilleDto } from './dto/create-ville';
import { UpdateVilleDto } from './dto/update-ville';


@Injectable()
export class VilleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateVilleDto) {
    try {
      const ville = await this.prisma.ville.create({
        data: {
          nom: dto.nom
        },
      });
      return ville;
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ConflictException('Cette ville existe déjà.');
      }
      throw new InternalServerErrorException(
        'Erreur lors de la création de la ville.',
      );
    }
  }

  async findAll() {
    return this.prisma.ville.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const ville = await this.prisma.ville.findUnique({
      where: { id },
    });
    if (!ville) throw new NotFoundException('Ville introuvable');
    return ville;
  }

  async update(id: string, dto: UpdateVilleDto) {
    try {
      const updated = await this.prisma.ville.update({
        where: { id },
        data: {
          nom: dto.nom
        },
      });
      return updated;
    } catch (e: any) {
      if (e.code === 'P2025')
        throw new NotFoundException('Ville introuvable');
      if (e.code === 'P2002')
        throw new ConflictException('Cette ville existe déjà.');
      throw new InternalServerErrorException(
        'Erreur lors de la mise à jour de la ville.',
      );
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.ville.delete({
        where: { id },
      });
      return deleted;
    } catch (e: any) {
      if (e.code === 'P2025')
        throw new NotFoundException('Ville introuvable');
      throw new InternalServerErrorException(
        'Erreur lors de la suppression de la ville.',
      );
    }
  }
}
