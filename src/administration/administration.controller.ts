import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards, Query, UseInterceptors, UploadedFile,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBearerAuth,ApiQuery} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdministrationService } from './administration.service';
import { CreateAdministrationDto } from './dto/create-administration';
import { UpdateAdministrationDto } from './dto/update-administration';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@ApiBearerAuth('Bearer')
@ApiTags('Gestion des administrations')

@UseGuards(JwtAuthGuard)
@Controller('administrations')
export class AdministrationController {
  constructor(private readonly administrationService: AdministrationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle administration' })
  @ApiResponse({ status: 201, description: 'Administration créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() dto: CreateAdministrationDto) {
    return this.administrationService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les administrations' })
  @ApiQuery({name: 'search',required: false,type: String, description: 'Recherche par nom ou mot-clé',})
  @ApiQuery({name: 'categorie',required: false,type: String,description: 'Filtrer par catégorie',})
  @ApiQuery({name: 'page',required: false, type: Number, description: 'Numéro de la page (par défaut: 1)',})
  @ApiQuery({name: 'limit',required: false, type: Number,description: 'Nombre d’éléments par page (par défaut: 6)', })
  @ApiResponse({ status: 200, description: 'Liste des administrations retournée avec succès.' })
  async findAll(
    @Query('search') search?: string,
    @Query('categorie') categorie?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 4,
  ) {
    return this.administrationService.findAll({
      search,
      categorie,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une administration par son ID' })
  @ApiParam({ name: 'id', description: 'ID de l’administration (UUID)' })
  @ApiResponse({ status: 200, description: 'Administration trouvée.' })
  @ApiResponse({ status: 404, description: 'Administration non trouvée.' })
  findOne(@Param('id') id: string) {
    return this.administrationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une administration' })
  @ApiParam({ name: 'id', description: 'ID de l’administration à modifier (UUID)' })
  @ApiResponse({ status: 200, description: 'Administration mise à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Administration non trouvée.' })
  update(@Param('id') id: string, @Body() dto: UpdateAdministrationDto) {
    return this.administrationService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une administration' })
  @ApiParam({ name: 'id', description: 'ID de l’administration à supprimer (UUID)' })
  @ApiResponse({ status: 200, description: 'Administration supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Administration non trouvée.' })
  remove(@Param('id') id: string) {
    return this.administrationService.remove(id);
  }
}
