import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTypeAdministrationDto } from './dto/create-type-administration';
import { UpdateTypeAdministrationDto } from './dto/update-type-administrations';

@Injectable()
export class TypeAdministrationService {
  constructor(private readonly prisma: PrismaService) {}

 async create(dto: CreateTypeAdministrationDto) {
    try {
      const typeAdmin = await this.prisma.typeAdministration.create({
        data: {
          libelle: dto.libelle,
        },
      });
      return typeAdmin;
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ConflictException('Ce type d\'administration existe déjà.');
      }
      throw new InternalServerErrorException('Erreur lors de la création du type d\'administration.');
    }
  }


 async findAll() {
    return this.prisma.typeAdministration.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: string) {
    const typeAdmin = await this.prisma.typeAdministration.findUnique({
      where: { id },
    });
    if (!typeAdmin) throw new NotFoundException('Type d\'administration introuvable');
    return typeAdmin;
  }

  async update(id: string, dto: UpdateTypeAdministrationDto) {
    try {
      const updated = await this.prisma.typeAdministration.update({
        where: { id },
        data: { libelle: dto.libelle },
      });
      return updated;
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Type d\'administration introuvable');
      if (e.code === 'P2002') throw new ConflictException('Ce type d\'administration existe déjà.');
      throw new InternalServerErrorException('Erreur lors de la mise à jour du type d\'administration.');
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.typeAdministration.delete({
        where: { id },
      });
      return deleted;
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Type d\'administration introuvable');
      throw new InternalServerErrorException('Erreur lors de la suppression du type d\'administration.');
    }
  }
}
