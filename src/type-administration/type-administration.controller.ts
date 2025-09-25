import {Controller,Get,Post,Body,Patch,Param,Delete, UseGuards,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateTypeAdministrationDto } from './dto/update-type-administrations';
import { CreateTypeAdministrationDto } from './dto/create-type-administration';
import { TypeAdministrationService } from './type-administration.service';

@ApiBearerAuth('Bearer')
@ApiTags('Gestion des types dadministrations')

@UseGuards(JwtAuthGuard)
@Controller('type-administration')
export class TypeAdministrationController {
  constructor(private readonly typeAdminService : TypeAdministrationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau type dadministration' })
  @ApiResponse({ status: 201, description: 'type dadministration créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() dto: CreateTypeAdministrationDto) {
    return this.typeAdminService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les types administrations' })
  @ApiResponse({ status: 200, description: 'Liste des types d_administrations retournée avec succès.' })
  findAll() {
    return this.typeAdminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un type d_administration par son ID' })
  @ApiParam({ name: 'id', description: 'ID dun type d_administration (UUID)' })
  @ApiResponse({ status: 200, description: 'type trouvé.' })
  @ApiResponse({ status: 404, description: 'type non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.typeAdminService.findOne(id); // on suppose UUID, donc pas besoin de +id
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un type administration ' })
  @ApiParam({ name: 'id', description: 'ID du type administration  à modifier (UUID)' })
  @ApiResponse({ status: 200, description: 'type administration mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'type administration non trouvé.' })
  update(@Param('id') id: string, @Body() dto: UpdateTypeAdministrationDto) {
    return this.typeAdminService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un type administration' })
  @ApiParam({ name: 'id', description: 'ID de type administration à supprimer (UUID)' })
  @ApiResponse({ status: 200, description: 'type administration supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'type administration non trouvé.' })
  remove(@Param('id') id: string) {
    return this.typeAdminService.remove(id);
  }
}
