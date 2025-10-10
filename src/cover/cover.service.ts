import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoverService {
  constructor(private readonly prisma: PrismaService) {}

  
  async create(url: string, administrationId: string) {
    try {
      
      const admin = await this.prisma.administration.findUnique({ where: { id: administrationId } });
      if (!admin) throw new NotFoundException("Administration non trouvée");

     
      const existing = await this.prisma.cover.findUnique({ where: { administrationId } });
      if (existing) {
        return await this.prisma.cover.update({
          where: { administrationId },
          data: { url },
        });
      }

      return await this.prisma.cover.create({
        data: { url, administrationId },
      });

    } catch (e: any) {
      if (e.code === 'P2002') throw new ConflictException('Cette cover existe déjà pour cette administration.');
      throw new InternalServerErrorException('Erreur lors de la création de la cover.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.cover.findMany({ include: { administration: true }});
    } catch (e) {
      throw new InternalServerErrorException('Erreur lors de la récupération des covers.');
    }
  }

  async findOne(id: string) {
    try {
      const cover = await this.prisma.cover.findUnique({ where: { id }, include: { administration: true } });
      if (!cover) throw new NotFoundException("Cover introuvable");
      return cover;
    } catch (e: any) {
      if (e instanceof NotFoundException) throw e;
      throw new InternalServerErrorException('Erreur lors de la récupération de la cover.');
    }
  }
  
  async remove(id: string) {
    try {
      return await this.prisma.cover.delete({ where: { id } });
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Cover introuvable');
      throw new InternalServerErrorException('Erreur lors de la suppression de la cover.');
    }
  }
}
