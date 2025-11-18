import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards, Query, UseInterceptors, UploadedFile,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBearerAuth,ApiQuery, ApiConsumes} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdministrationService } from './administration.service';
import { CreateAdministrationDto } from './dto/create-administration';
import { UpdateAdministrationDto } from './dto/update-administration';
import { Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { extname, join } from 'path';
import { existsSync } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @Get('count')
  @ApiOperation({ summary: 'Compter le nombre total d’administrations' })
  @ApiResponse({ status: 200, description: 'Nombre total retourné.' })
  countTotal() {
    return this.administrationService.countTotal();
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

  @Post(':id/cover')
  @ApiOperation({ summary: 'Upload de l\'image de couverture' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/covers',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `cover-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Seules les images sont autorisées'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadCover(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('Aucun fichier fourni');
    }

    const coverUrl = `/administrations/covers/${file.filename}`;
    
    // Mettre à jour l'administration avec la nouvelle cover
    const updated = await this.administrationService.update(id, {
      cover: coverUrl,
    } as any);

    return {
      message: 'Cover uploadée avec succès',
      cover: coverUrl,
      administration: updated,
    };
  }

  @Get('covers/:filename')
  @ApiOperation({ summary: 'Récupérer une image de couverture' })
  getCover(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads/covers', filename);

    if (!existsSync(filePath)) {
      throw new NotFoundException('Image non trouvée');
    }

    return res.sendFile(filePath);
  }
}
