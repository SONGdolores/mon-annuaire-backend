import {Controller,Get,Post,Patch,Delete,Param,Body,UseGuards,UseInterceptors,UploadedFile,BadRequestException,} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CoverService } from './cover.service';
import { CreateCoverDto } from './dto/create-cover.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import * as fs from 'fs';

@ApiBearerAuth('Bearer')
@ApiTags('Gestion des covers')
@UseGuards(JwtAuthGuard)
@Controller('covers')
export class CoverController {
  constructor(private readonly coverService: CoverService) {}

  @Post()
  @ApiOperation({ summary: 'Ajouter une cover à une administration' })
  @ApiResponse({ status: 201, description: 'Cover créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCoverDto })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (_req, _file, cb) => {
        const path = join(process.cwd(), 'uploads/covers');
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      },
      filename: (_req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      },
    }),
    fileFilter: (_req, file, cb) => {
      if (!file.mimetype.match(/^image\/(png|jpe?g|webp)$/)) {
        return cb(new BadRequestException('Seulement les images PNG, JPG, JPEG ou WEBP sont acceptées'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  async uploadCover(
    @UploadedFile() file: Express.Multer.File,
    @Body('administrationId') administrationId: string,
  ) {
    if (!file) throw new BadRequestException('Fichier manquant');
    const url = `/uploads/covers/${file.filename}`;
    return this.coverService.create(url, administrationId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour la cover d’une administration' })
  @ApiParam({ name: 'id', description: 'ID de l’administration' })
  @ApiResponse({ status: 200, description: 'Cover mise à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Cover ou administration non trouvée.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCoverDto })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (_req, _file, cb) => {
        const path = join(process.cwd(), 'uploads/covers');
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      },
      filename: (_req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      },
    }),
    fileFilter: (_req, file, cb) => {
      if (!file.mimetype.match(/^image\/(png|jpe?g|webp)$/)) {
        return cb(new BadRequestException('Seulement les images PNG, JPG, JPEG ou WEBP sont acceptées'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  async updateCover(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Fichier manquant');
    const url = `/uploads/covers/${file.filename}`;
    return this.coverService.create(url, id); // Réutilise create pour update si existant
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les covers' })
  @ApiResponse({ status: 200, description: 'Liste des covers retournée avec succès.' })
  async findAll() {
    return this.coverService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une cover par ID' })
  @ApiParam({ name: 'id', description: 'ID de la cover' })
  @ApiResponse({ status: 200, description: 'Cover trouvée.' })
  @ApiResponse({ status: 404, description: 'Cover non trouvée.' })
  async findOne(@Param('id') id: string) {
    return this.coverService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une cover' })
  @ApiParam({ name: 'id', description: 'ID de la cover à supprimer' })
  @ApiResponse({ status: 200, description: 'Cover supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Cover non trouvée.' })
  async remove(@Param('id') id: string) {
    return this.coverService.remove(id);
  }
}
