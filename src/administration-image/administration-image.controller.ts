import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AdministrationImageService } from './administration-image.service';
import { CreateAdministrationImageDto } from './dto/create-administration-image';
import { UpdateAdministrationImageDto } from './dto/update-administration-image';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Administration Images')

@UseGuards(JwtAuthGuard)
@Controller('administration-image')
export class AdministrationImageController {
  constructor(private readonly service: AdministrationImageService) {}

  @Post()
  @ApiOperation({ summary: 'Ajouter une image à une administration' })
  create(@Body() dto: CreateAdministrationImageDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les images' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une image par ID' })
  @ApiParam({ name: 'id', description: 'ID de l’image' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une image' })
  update(@Param('id') id: string, @Body() dto: UpdateAdministrationImageDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une image' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
