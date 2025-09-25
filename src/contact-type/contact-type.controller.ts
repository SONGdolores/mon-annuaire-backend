import { Controller, Get, Param, BadRequestException, UseGuards } from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,} from '@nestjs/swagger';
import { ContactTypeService } from './contact-type.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Gestion des types de contact')

@UseGuards(JwtAuthGuard)
@Controller('contact-types')
export class ContactTypeController {
  constructor(private readonly contactTypeService: ContactTypeService) {}

  @Get()
  @ApiOperation({ summary: 'Lister tous les types de contact disponibles' })
  @ApiResponse({
    status: 200,
    description: 'Liste des types de contact retournée avec succès.',
  })
  findAll() {
    return this.contactTypeService.findAll();
  }

  @Get(':type')
  @ApiOperation({ summary: 'Vérifie si un type de contact est valide' })
  @ApiParam({
    name: 'type',
    description: 'Valeur du type de contact (Telephone, Email, Fax, Autre)',
  })
  @ApiResponse({ status: 200, description: 'Type de contact valide.' })
  @ApiResponse({ status: 400, description: 'Type de contact invalide.' })
  validate(@Param('type') type: string) {
    if (!this.contactTypeService.isValid(type)) {
      throw new BadRequestException(
        `Type de contact invalide. Valeurs autorisées : ${this.contactTypeService
          .findAll()
          .join(', ')}`,
      );
    }
    return { valid: true, type };
  }
}
