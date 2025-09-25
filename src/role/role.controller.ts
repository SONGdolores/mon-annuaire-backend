import {Controller,Get,Post,Body,Patch,Param,Delete, UseGuards,} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBearerAuth} from '@nestjs/swagger';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth('Bearer')
@ApiTags('Gestion des rôles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau rôle' })
  @ApiResponse({ status: 201, description: 'Rôle créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ summary: 'Lister tous les rôles' })
  @ApiResponse({ status: 200, description: 'Liste des rôles retournée avec succès.' })
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un rôle par son ID' })
  @ApiParam({ name: 'id', description: 'ID du rôle (UUID)' })
  @ApiResponse({ status: 200, description: 'Rôle trouvé.' })
  @ApiResponse({ status: 404, description: 'Rôle non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id); // on suppose UUID, donc pas besoin de +id
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un rôle' })
  @ApiParam({ name: 'id', description: 'ID du rôle à modifier (UUID)' })
  @ApiResponse({ status: 200, description: 'Rôle mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Rôle non trouvé.' })
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.roleService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un rôle' })
  @ApiParam({ name: 'id', description: 'ID du rôle à supprimer (UUID)' })
  @ApiResponse({ status: 200, description: 'Rôle supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Rôle non trouvé.' })
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
