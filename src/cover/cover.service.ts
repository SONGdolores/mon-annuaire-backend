import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class CoverService {
  constructor(private readonly prisma: PrismaService) {}


async create(url: string, administrationId: string) {
  try {
    const admin = await this.prisma.administration.findUnique({ 
      where: { id: administrationId } 
    });
    if (!admin) throw new NotFoundException("Administration non trouvée");

    const existing = await this.prisma.cover.findUnique({ 
      where: { administrationId } 
    });
    if (existing) {
      try {
        fs.unlinkSync(join(process.cwd(), existing.url));
      } catch (e) {
        console.warn('Fichier précédent introuvable:', existing.url);
      }
    }

    return await this.prisma.cover.upsert({
      where: { administrationId },
      update: { url },
      create: { url, administrationId },
    });

  } catch (e: any) {
    if (e.code === 'P2002') throw new ConflictException('Cette cover existe déjà pour cette administration.');
    throw new InternalServerErrorException('Erreur lors de la création de la cover.');
  }
}

async update(id: string, url: string) {
  try {
    const cover = await this.prisma.cover.findUnique({ 
      where: { id } 
    });
    if (!cover) throw new NotFoundException("Cover introuvable");

    try {
      fs.unlinkSync(join(process.cwd(), cover.url));
    } catch (e) {
      console.warn('Fichier précédent introuvable:', cover.url);
    }

    return await this.prisma.cover.update({
      where: { id },
      data: { url },
    });
  } catch (e: any) {
    if (e.code === 'P2025') throw new NotFoundException('Cover introuvable');
    throw new InternalServerErrorException('Erreur lors de la mise à jour de la cover.');
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
    const cover = await this.prisma.cover.findUnique({ where: { id } });
    if (!cover) throw new NotFoundException('Cover introuvable');

    try {
      fs.unlinkSync(join(process.cwd(), cover.url));
    } catch (e) {
      console.warn('Fichier introuvable lors de la suppression:', cover.url);
    }

    return await this.prisma.cover.delete({ where: { id } });
  } catch (e: any) {
    if (e.code === 'P2025') throw new NotFoundException('Cover introuvable');
    throw new InternalServerErrorException('Erreur lors de la suppression de la cover.');
  }
}
}
