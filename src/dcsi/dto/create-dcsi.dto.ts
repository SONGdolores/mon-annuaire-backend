import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateDcsiDto {
  @ApiProperty({ description: "Nom du responsable DCSI", example: "Jean Mba" })
  @IsString()
  @IsNotEmpty({ message: "Le nom du responsable est obligatoire." })
  responsableNom: string;

  @ApiProperty({ description: "Email du responsable DCSI", example: "jean.mba@gouv.ga" })
  @IsEmail({}, { message: "L'email du responsable doit être valide." })
  responsableEmail: string;

  @ApiProperty({ description: "Téléphone du responsable DCSI", example: "+24160000000", required: false })
  @IsOptional()
  @IsString()
  responsablePhone?: string;

  @ApiProperty({ description: "Nom du chef de service", example: "Marie Ella" })
  @IsString()
  @IsNotEmpty({ message: "Le nom du chef de service est obligatoire." })
  chefServiceNom: string;

  @ApiProperty({ description: "Email du chef de service", example: "marie.ella@gouv.ga" })
  @IsEmail({}, { message: "L'email du chef de service doit être valide." })
  chefServiceEmail: string;

  @ApiProperty({ description: "Téléphone du chef de service", example: "+24170000000", required: false })
  @IsOptional()
  @IsString()
  chefServicePhone?: string;

  @ApiProperty({ description: "ID de l'administration liée (UUID)" })
  @IsUUID()
  @IsNotEmpty({ message: "L'administration associée est obligatoire." })
  administrationId: string;
}

