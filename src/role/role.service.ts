import {BadRequestException,Injectable,InternalServerErrorException,NotFoundException,} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      // Vérifie s'il existe déjà un rôle avec le même nom
      const existing = await this.prismaService.role.findUnique({
        where: { nom: createRoleDto.nom },
      });

      if (existing) {
        throw new BadRequestException('Un rôle avec ce nom existe déjà.');
      }

      return await this.prismaService.role.create({
        data: {
          nom: createRoleDto.nom,
          code: createRoleDto.code,
          description: createRoleDto.description,
          permissions: {
            connect: createRoleDto.permissions.map(id => ({ id })),
          },
        },
        include: {
          permissions: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la création du rôle.' + error,
      );
    }
  }

  async findAll() {
    try {
      return await this.prismaService.role.findMany({
        include: {
          permissions: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    const role = await this.prismaService.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });

    if (!role) {
      throw new NotFoundException(`Rôle avec l'ID ${id} non trouvé.`);
    }

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const existing = await this.prismaService.role.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Le rôle avec l'ID ${id} n'existe pas.`);
    }

    // Vérifie s'il existe déjà un autre rôle avec le même nom
    if (updateRoleDto.nom) {
      const duplicate = await this.prismaService.role.findFirst({
        where: {
          nom: updateRoleDto.nom,
          NOT: { id },
        },
      });

      if (duplicate) {
        throw new BadRequestException(
          `Un autre rôle avec le nom "${updateRoleDto.nom}" existe déjà.`,
        );
      }
    }

    const updatedRole = await this.prismaService.role.update({
      where: { id },
      data: {
        nom: updateRoleDto.nom,
        description: updateRoleDto.description,
        permissions: updateRoleDto.permissions
          ? {
              set: updateRoleDto.permissions.map(id => ({ id })),
            }
          : undefined,
      },
      include: {
        permissions: true,
      },
    });

    return updatedRole;
  }

  async remove(id: string) {
    const existing = await this.prismaService.role.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Le rôle avec l'ID ${id} n'existe pas.`);
    }

    return this.prismaService.role.delete({
      where: { id },
    });
  }
}
