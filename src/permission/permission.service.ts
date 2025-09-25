import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';


@Injectable()
export class PermissionService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(createPermissionDto: CreatePermissionDto) {

    const existing = await this.prismaService.permission.findUnique({
      where: { nom: createPermissionDto.nom }
    });

    if (existing) {
      throw new BadRequestException('la permission existe deja. ');
    }

    return await this.prismaService.permission.create({
      data: createPermissionDto
    });
  } catch (error) {

    throw new InternalServerErrorException('Erreur lors de la creation de la permission')
  }


  async findAll() {
    try {
      const permissions = await this.prismaService.permission.findMany();
      return permissions;

    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    const permission = await this.prismaService.permission.findUnique({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException(`La permission avec Id ${id} n'est pas trouvée.`);
    }
    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {

    const existing = await this.prismaService.permission.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Impossible de modifier permission Id ${id} car il est introuvable.`);
    }

      if (updatePermissionDto.nom) {
    const duplicate = await this.prismaService.permission.findUnique({
      where: { nom: updatePermissionDto.nom },
    });

    if (duplicate && duplicate.id !== id) {
      throw new BadRequestException(`La permission avec le nom "${updatePermissionDto.nom}" existe déjà.`);
    }
  }

    const permissionUpdated = await this.prismaService.permission.update({
      where: { id },
      data: updatePermissionDto
    });

    return permissionUpdated;
  }

  async remove(id: string) {
    const existing = await this.prismaService.permission.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Impossible de modifier permission Id ${id} car il est introuvable.`);
    }

    return this.prismaService.permission.delete({
      where: { id },
    });
  }
}
