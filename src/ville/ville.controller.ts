import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBearerAuth,} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { VilleService } from './ville.service';
import { CreateVilleDto } from './dto/create-ville';
import { UpdateVilleDto } from './dto/update-ville';

@ApiBearerAuth('Bearer')
@ApiTags('Gestion des villes')

@UseGuards(JwtAuthGuard)
@Controller('villes')
export class VilleController {
  constructor(private readonly villeService: VilleService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle ville' })
  @ApiResponse({ status: 201, description: 'Ville créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() dto: CreateVilleDto) {
    return this.villeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les villes' })
  @ApiResponse({ status: 200, description: 'Liste des villes retournée avec succès.' })
  findAll() {
    return this.villeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une ville par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la ville (UUID)' })
  @ApiResponse({ status: 200, description: 'Ville trouvée.' })
  @ApiResponse({ status: 404, description: 'Ville non trouvée.' })
  findOne(@Param('id') id: string) {
    return this.villeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une ville' })
  @ApiParam({ name: 'id', description: 'ID de la ville à modifier (UUID)' })
  @ApiResponse({ status: 200, description: 'Ville mise à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Ville non trouvée.' })
  update(@Param('id') id: string, @Body() dto: UpdateVilleDto) {
    return this.villeService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une ville' })
  @ApiParam({ name: 'id', description: 'ID de la ville à supprimer (UUID)' })
  @ApiResponse({ status: 200, description: 'Ville supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Ville non trouvée.' })
  remove(@Param('id') id: string) {
    return this.villeService.remove(id);
  }
}
