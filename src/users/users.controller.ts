import {Controller,Get,Post,Body,Patch,Param,Delete, UseGuards,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@ApiBearerAuth('Bearer')
@ApiTags('Gestion des utilisateurs')
@Controller('utilisateurs')
export class UsersController {
  constructor(private readonly usersService : UsersService ) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() dto: CreateUsersDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, UseGuards)
  @ApiOperation({ summary: 'Lister tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs retournée avec succès.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un utilisateur par son ID' })
  @ApiParam({ name: 'id', description: 'ID de utilisateur (UUID)' })
  @ApiResponse({ status: 200, description: 'utilisateur trouvé.' })
  @ApiResponse({ status: 404, description: 'utilisateur non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id); // on suppose UUID, donc pas besoin de +id
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de utilisateur à modifier (UUID)' })
  @ApiResponse({ status: 200, description: 'utilisateur mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'utilisateur non trouvé.' })
  update(@Param('id') id: string, @Body() dto: UpdateUsersDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de utilisateur à supprimer (UUID)' })
  @ApiResponse({ status: 200, description: 'utilisateur supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'utilisateur non trouvé.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
