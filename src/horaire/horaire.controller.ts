import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { HoraireService } from './horaire.service';
import { CreateHoraireDto } from './dto/create-horaire';
import { UpdateHoraireDto } from './dto/update-horaire';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Horaires')

@UseGuards(JwtAuthGuard)
@Controller('horaires')
export class HoraireController {
  constructor(private readonly service: HoraireService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel horaire' })
  create(@Body() dto: CreateHoraireDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les horaires' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un horaire par ID' })
  @ApiParam({ name: 'id', description: 'ID de l’horaire' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un horaire' })
  update(@Param('id') id: string, @Body() dto: UpdateHoraireDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un horaire' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
