import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdministrationImageDto } from './dto/create-administration-image';
import { UpdateAdministrationImageDto } from './dto/update-administration-image';


@Injectable()
export class AdministrationImageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAdministrationImageDto) {
    try {
      return await this.prisma.administrationImage.create({ data: dto });
    } catch (e) {
      throw new InternalServerErrorException('Erreur lors de la création de l’image.');
    }
  }

  async findAll() {
    return this.prisma.administrationImage.findMany({
      include: { administration: true },
    });
  }

  async findOne(id: string) {
    const image = await this.prisma.administrationImage.findUnique({
      where: { id },
      include: { administration: true },
    });
    if (!image) throw new NotFoundException('Image introuvable');
    return image;
  }

  async update(id: string, dto: UpdateAdministrationImageDto) {
    try {
      return await this.prisma.administrationImage.update({
        where: { id },
        data: dto,
      });
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Image introuvable');
      throw new InternalServerErrorException('Erreur lors de la mise à jour de l’image.');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.administrationImage.delete({ where: { id } });
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Image introuvable');
      throw new InternalServerErrorException('Erreur lors de la suppression de l’image.');
    }
  }
}
