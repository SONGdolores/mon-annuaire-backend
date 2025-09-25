import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/auth/guards/permissions.decorator';

@ApiBearerAuth('Bearer')
@ApiTags("Gestion des permission")
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  
  @Post()
  @ApiOperation({ summary: 'Creer une permission' })
  @ApiResponse({ status: 201, description : 'Permission crée avec succès'})
  @ApiBody({ type: CreatePermissionDto})
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('LIST_PERMISSION')
  @ApiOperation({ summary: 'Lister toutes les permissions' })
  @ApiResponse({ status: 200, description : 'Lister des permissions'})
   async findAll() {
    return await this.permissionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une permission a partir de Id' })
  @ApiParam({ name: 'id', required: true, description: 'Id de la permission' })
  @ApiResponse({ status: 200, description: 'la permission a été trouvée.' })
  @ApiResponse({ status: 404, description: 'la permission nest pas trouvée.' })
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une permission' })
  @ApiParam({ name: 'id', description: 'Id de la permission à modifier' })
  @ApiResponse({ status: 200, description: 'Permission mise à jour.' })
  async update(@Param('id') id: string, 
         @Body() updatePermissionDto: UpdatePermissionDto) {
    return await this.permissionService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une permission' })
  @ApiParam({ name: 'id', description: 'Id de la permission à supprimer' })
  @ApiResponse({ status: 200, description: 'la permission a été supprimée.' })
  remove(@Param('id') id: string) {
    return this.permissionService.remove(id);
  }
}