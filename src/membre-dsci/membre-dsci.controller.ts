import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MembreDsciService } from './membre-dsci.service';
import { CreateMembreDsciDto } from './dto/create-membre-dsci.dto';
import { UpdateMembreDsciDto } from './dto/update-membre-dsci.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiBearerAuth("Bearer")
@ApiTags("Gestion des membres du DCSI")
@Controller("membre-dsci")
@UseGuards(JwtAuthGuard)
export class MembreDsciController {
  constructor(private readonly  membreDsciService: MembreDsciService) {}

  @Post()
  @ApiOperation({ summary: "Créer un membre du DCSI" })
  @ApiResponse({ status: 201, description: "Membre créé avec succès." })
  create(@Body() dto: CreateMembreDsciDto) {
    return this.membreDsciService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Lister tous les membres du DCSI" })
  @ApiResponse({ status: 200, description: "Liste des membres retournée avec succès." })
  findAll() {
    return this.membreDsciService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtenir un membre du DCSI par ID" })
  @ApiParam({ name: "id", description: "ID du membre du DCSI (UUID)" })
  findOne(@Param("id") id: string) {
    return this.membreDsciService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Mettre à jour un membre du DCSI" })
  @ApiParam({ name: "id", description: "ID du membre à modifier (UUID)" })
  update(@Param("id") id: string, @Body() dto: UpdateMembreDsciDto) {
    return this.membreDsciService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Supprimer un membre du DCSI" })
  @ApiParam({ name: "id", description: "ID du membre à supprimer (UUID)" })
  remove(@Param("id") id: string) {
    return this.membreDsciService.remove(id);
  }
}

