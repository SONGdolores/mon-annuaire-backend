import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBearerAuth,} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact';
import { UpdateContactDto } from './dto/update-contact';

@ApiBearerAuth('Bearer')
@ApiTags('Gestion des contacts')

@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau contact' })
  @ApiResponse({ status: 201, description: 'Contact créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les contacts' })
  @ApiResponse({ status: 200, description: 'Liste des contacts retournée avec succès.' })
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un contact par son ID' })
  @ApiParam({ name: 'id', description: 'ID du contact (UUID)' })
  @ApiResponse({ status: 200, description: 'Contact trouvé.' })
  @ApiResponse({ status: 404, description: 'Contact non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un contact' })
  @ApiParam({ name: 'id', description: 'ID du contact à modifier (UUID)' })
  @ApiResponse({ status: 200, description: 'Contact mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Contact non trouvé.' })
  update(@Param('id') id: string, @Body() dto: UpdateContactDto) {
    return this.contactService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un contact' })
  @ApiParam({ name: 'id', description: 'ID du contact à supprimer (UUID)' })
  @ApiResponse({ status: 200, description: 'Contact supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Contact non trouvé.' })
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
