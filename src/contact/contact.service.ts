import {Injectable,NotFoundException,ConflictException,InternalServerErrorException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact';
import { UpdateContactDto } from './dto/update-contact';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    try {
      const contact = await this.prisma.contact.create({
        data: dto
      });
      return contact;
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ConflictException('Ce contact existe déjà.');
      }
      throw new InternalServerErrorException('Erreur lors de la création du contact.');
    }
  }

  async findAll() {
    return this.prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });
    if (!contact) throw new NotFoundException('Contact introuvable');
    return contact;
  }

  async update(id: string, dto: UpdateContactDto) {
    try {
      const updated = await this.prisma.contact.update({
        where: { id },
        data: {
          libelle: dto.libelle,
          type: dto.type,
        },
      });
      return updated;
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Contact introuvable');
      if (e.code === 'P2002') throw new ConflictException('Ce contact existe déjà.');
      throw new InternalServerErrorException('Erreur lors de la mise à jour du contact.');
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.contact.delete({
        where: { id },
      });
      return deleted;
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Contact introuvable');
      throw new InternalServerErrorException('Erreur lors de la suppression du contact.');
    }
  }
}
