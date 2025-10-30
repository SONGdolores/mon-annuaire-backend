import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { DcsiService } from "./dcsi.service";
import { CreateDcsiDto } from "./dto/create-dcsi.dto";
import { UpdateDcsiDto } from "./dto/update-dcsi.dto";

@ApiBearerAuth("Bearer")
@ApiTags("Gestion du DCSI")
@Controller("dcsi")
@UseGuards(JwtAuthGuard)
export class DcsiController {
  constructor(private readonly dcsiService: DcsiService) {}

  @Post()
  @ApiOperation({ summary: "Créer un nouveau DCSI" })
  @ApiResponse({ status: 201, description: "DCSI créé avec succès." })
  create(@Body() dto: CreateDcsiDto) {
    return this.dcsiService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Lister tous les DCSI" })
  @ApiResponse({ status: 200, description: "Liste des DCSI retournée avec succès." })
  findAll() {
    return this.dcsiService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtenir un DCSI par son ID" })
  @ApiParam({ name: "id", description: "ID du DCSI (UUID)" })
  findOne(@Param("id") id: string) {
    return this.dcsiService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Mettre à jour un DCSI" })
  @ApiParam({ name: "id", description: "ID du DCSI à modifier (UUID)" })
  update(@Param("id") id: string, @Body() dto: UpdateDcsiDto) {
    return this.dcsiService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Supprimer un DCSI" })
  @ApiParam({ name: "id", description: "ID du DCSI à supprimer (UUID)" })
  remove(@Param("id") id: string) {
    return this.dcsiService.remove(id);
  }
}
