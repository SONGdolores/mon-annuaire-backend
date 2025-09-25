import {Injectable,NotFoundException,ConflictException,InternalServerErrorException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdministrationDto } from './dto/create-administration';
import { UpdateAdministrationDto } from './dto/update-administration';

@Injectable()
export class AdministrationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAdministrationDto) {
    console.log('DTO reçu dans create:', dto);
    try {
      const admin = await this.prisma.administration.create({
        data: {
        nom: dto.nom,
        ministereDeTutelle: dto.ministereDeTutelle,
        mission: dto.mission,
        quartier: dto.quartier,
        latitude: dto.latitude,
        longitude: dto.longitude,

        ville: dto.villeId ? { connect: { id: dto.villeId } } : undefined,
        typeAdministration: { connect: { id: dto.typeAdministrationId } },
      },
      include: {
        contacts: true,
        services: true,
        horaires: true,
        images: true,
        ville: true,
        typeAdministration: true,
      },
        });

      return admin;
    } catch (e: any) {
      console.log(e)
      if (e.code === 'P2002')
        throw new ConflictException('Cette administration existe déjà.');
      throw new InternalServerErrorException(
        'Erreur lors de la création de l’administration.',
      );
    }
  }

  
  async findAll(params: {search?: string;categorie?: string;page: number;limit: number;  }) {
    const { search, categorie, page, limit } = params;

    const where: any = {};

    if (search) {
      where.OR = [
        { nom: { contains: search, mode: 'insensitive' } },
        { adresse: { contains: search, mode: 'insensitive' } },
        { services: { some: { description: { contains: search, mode: 'insensitive' } } } },
      ];
    }

    if (categorie) {
      where.TypeAdministration = { libelle: categorie };
    }

    const [items, total] = await Promise.all([
      this.prisma.administration.findMany({
        where,
        include: {
          ville: { select: { nom: true } },
          typeAdministration: { select: { libelle: true } },
          contacts: true,
          services: true,
          horaires: true,
          images: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { nom: 'asc' },
      }),
      this.prisma.administration.count({ where }),
    ]);

    return ({
      data: items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  }

 
  async findOne(id: string) {
    const admin = await this.prisma.administration.findUnique({
      where: { id },
      include: {
        ville: { select: { nom: true } },
        typeAdministration: { select: { libelle: true } },
        contacts: { select: { libelle: true, type: true } },
        services: { select: { description: true } },
        horaires: true, 
        images: true,
      },
    });
    if (!admin) throw new NotFoundException('Administration introuvable');
    return admin;
  }

 
  async update(id: string, dto: UpdateAdministrationDto) {
    try {
      const updated = await this.prisma.administration.update({
        where: { id },
        data: {
          nom: dto.nom,
          ministereDeTutelle: dto.ministereDeTutelle,
          mission: dto.mission,
          latitude: dto.latitude,
          longitude: dto.longitude,
          quartier: dto.quartier,
          cover: dto.cover,
          villeId: dto.villeId,
          typeAdministrationId: dto.typeAdministrationId,
        },
        include: {
          ville: { select: { nom: true } },
          typeAdministration: { select: { libelle: true } },
          contacts: { select: { libelle: true, type: true } },
          services: { select: { description: true } },
          horaires: true, 
          images: true,
        },
      });
      console.log('DTO reçu dans update:', dto); 
      return updated;
    } catch (e: any) {
      if (e.code === 'P2025')
        throw new NotFoundException('Administration introuvable');
      if (e.code === 'P2002')
        throw new ConflictException('Cette administration existe déjà.');
      throw new InternalServerErrorException(
        'Erreur lors de la mise à jour de l’administration.',
      );
    }
  }

  // Suppression d'une administration
  async remove(id: string) {
    try {
      const deleted = await this.prisma.administration.delete({
        where: { id },
      });
      return deleted;
    } catch (e: any) {
      if (e.code === 'P2025')
        throw new NotFoundException('Administration introuvable');
      throw new InternalServerErrorException(
        'Erreur lors de la suppression de l’administration.',
      );
    }
  }
}
