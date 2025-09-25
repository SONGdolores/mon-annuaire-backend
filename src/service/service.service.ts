import {Injectable,NotFoundException,ConflictException,InternalServerErrorException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service';
import { UpdateServiceDto } from './dto/update-service';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    try {
      const service = await this.prisma.service.create({
        data: dto
      });
      return service;
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ConflictException('Ce service existe déjà.');
      }
      throw new InternalServerErrorException(
        'Erreur lors de la création du service.',
      );
    }
  }

  async findAll() {
    return this.prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });
    if (!service) throw new NotFoundException('Service introuvable');
    return service;
  }

  async update(id: string, dto: UpdateServiceDto) {
    try {
      const updated = await this.prisma.service.update({
        where: { id },
        data: {
          description: dto.description,
        },
      });
      return updated;
    } catch (e: any) {
      if (e.code === 'P2025')
        throw new NotFoundException('Service introuvable');
      if (e.code === 'P2002')
        throw new ConflictException('Ce service existe déjà.');
      throw new InternalServerErrorException(
        'Erreur lors de la mise à jour du service.',
      );
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.service.delete({
        where: { id },
      });
      return deleted;
    } catch (e: any) {
      if (e.code === 'P2025')
        throw new NotFoundException('Service introuvable');
      throw new InternalServerErrorException(
        'Erreur lors de la suppression du service.',
      );
    }
  }
}
