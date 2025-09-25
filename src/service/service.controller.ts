import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBearerAuth,} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service';
import { UpdateServiceDto } from './dto/update-service';

@ApiBearerAuth('Bearer')
@ApiTags('Gestion des services')

@UseGuards(JwtAuthGuard)
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau service' })
  @ApiResponse({ status: 201, description: 'Service créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les services' })
  @ApiResponse({ status: 200, description: 'Liste des services retournée avec succès.' })
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un service par son ID' })
  @ApiParam({ name: 'id', description: 'ID du service (UUID)' })
  @ApiResponse({ status: 200, description: 'Service trouvé.' })
  @ApiResponse({ status: 404, description: 'Service non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un service' })
  @ApiParam({ name: 'id', description: 'ID du service à modifier (UUID)' })
  @ApiResponse({ status: 200, description: 'Service mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Service non trouvé.' })
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.serviceService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un service' })
  @ApiParam({ name: 'id', description: 'ID du service à supprimer (UUID)' })
  @ApiResponse({ status: 200, description: 'Service supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Service non trouvé.' })
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
