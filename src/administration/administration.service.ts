import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdministrationDto } from './dto/create-administration';
import { UpdateAdministrationDto } from './dto/update-administration';

@Injectable()
export class AdministrationService {
  constructor(private readonly prisma: PrismaService) { }

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

            cover: dto.cover
            ? {
                create: {
                  url: dto.cover,
                },
              }
            : undefined,
        },
        include: {
          contacts: true,
          services: true,
          horaires: true,
          images: true,
          ville: true,
          typeAdministration: true,
          cover:true,
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


  async findAll(params: { search?: string; categorie?: string; page: number; limit: number; }) {
    const { search, categorie, page = 1 , limit } = params;

    const where: any = {};

    if (search) {
      where.OR = [
        { nom: { contains: search, mode: 'insensitive' } },
        { services: { some: { description: { contains: search, mode: 'insensitive' } } } },
      ];
    }

    if (categorie) {
      where.typeAdministrationId = categorie ;
    }

    const skip = limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

     console.log('Filtre where généré:', where);

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
          cover: true,
          dcsi: { include: { membres: true } },
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
        cover:true,
        dcsi: { include: { membres: true } },
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
          quartier: dto.quartier,
          latitude: dto.latitude,
          longitude: dto.longitude,
          villeId: dto.villeId,
          typeAdministrationId: dto.typeAdministrationId,

          // Création de nouveaux services
          services: dto.services && dto.services.length > 0
            ? {
              create: dto.services.map((s) => ({
                description: s.description,
              })),
            }
            : undefined,

          // Création de nouveaux horaires
          horaires: dto.horaires && dto.horaires.length > 0
            ? {
              create: dto.horaires.map((h) => ({
                jour: h.jour,
                heureOuverture: h.heureOuverture,
                heureFermeture: h.heureFermeture,
              })),
            }
            : undefined,

          // Création de nouveaux contacts
          contacts: dto.contacts && dto.contacts.length > 0
            ? {
              create: dto.contacts.map((c) => ({
                libelle: c.libelle,
                type: c.type,
              })),
            }
            : undefined,

          // Création de nouvelles images (galerie)
          images: dto.images && dto.images.length > 0
            ? {
              create: dto.images.map(url => ({ url })),
            }
            : undefined,

             cover: dto.cover
            ? {
                upsert: {
                  update: { url: dto.cover },
                  create: { url: dto.cover },
                },
              }
            : undefined,
        },
        include: {
          ville: { select: { nom: true } },
          typeAdministration: { select: { libelle: true } },
          contacts: { select: { id: true, libelle: true, type: true } },
          services: { select: { id: true, description: true } },
          horaires: true,
          images: true,
          cover: true,
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
