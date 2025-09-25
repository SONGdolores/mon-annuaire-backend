import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import * as bcrypt from 'bcrypt';
import { Utilisateur } from '../../generated/prisma/index';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private stripPassword<T extends { mot_de_passe?: string }>(Utilisateur: T) {

    // Enlève le champ mot_de_passe des réponses
    if (!Utilisateur) return Utilisateur;
    const { mot_de_passe, ...safe } = Utilisateur as any;
    return safe;
  }

  async create(dto: CreateUsersDto) {
    const hashed = await bcrypt.hash(dto.mot_de_passe, 10);
    try {
      const Utilisateur = await this.prisma.utilisateur.create({
        data: {
          login: dto.login,
          mot_de_passe: hashed,
          roleId: dto.roleId,
        },
        include: { role: true },
      });
      return this.stripPassword(Utilisateur);
    } catch (e: any) {
      if (e.code === 'P2002') {
        // contrainte unique: login
        throw new ConflictException('Ce login est déjà utilisé.');
      }
      throw new InternalServerErrorException('Erreur lors de la création de l’utilisateur.');
    }
  }

  async findAll() {
    const Utilisateur = await this.prisma.utilisateur.findMany({
      orderBy: { createdAt: 'desc' },
      include: { role: true }
    });
    return Utilisateur;
  }

  async findOne(id: string) {
    const Utilisateur = await this.prisma.utilisateur.findUnique({
      where: { id },
      include: { role: true },
    });
    if (!Utilisateur) throw new NotFoundException('Utilisateur introuvable');
    return this.stripPassword(Utilisateur);
  }

  async update(id: string, dto: UpdateUsersDto) {
    // Hash du mot de passe s’il est présent
    let data: any = { ...dto };


    try {
      const user = await this.prisma.utilisateur.update({
        where: { id },
        data,
        include: { role: true },
      });
      return this.stripPassword(user);
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Utilisateur introuvable');
      if (e.code === 'P2002') throw new ConflictException('Ce login est déjà utilisé.');
      throw new InternalServerErrorException('Erreur lors de la mise à jour.');
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.utilisateur.delete({
        where: { id },
        include: { role: true },
      });
      return this.stripPassword(deleted);
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundException('Utilisateur introuvable');
      throw new InternalServerErrorException('Erreur lors de la suppression.');
    }
  }
}
