import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMembreDsciDto {
  @ApiProperty({ description: "Nom du membre", example: "Pierre Ndong" })
  @IsString()
  @IsNotEmpty({ message: "Le nom du membre est obligatoire." })
  nom: string;

  @ApiProperty({ description: "Email du membre", example: "pierre.ndong@gouv.ga" })
  @IsEmail({}, { message: "L'email du membre doit être valide." })
  email: string;

  @ApiProperty({ description: "Numéro de téléphone du membre", example: "+24162000000", required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: "Fonction occupée dans le DCSI", example: "Technicien Réseau", required: false })
  @IsOptional()
  @IsString()
  fonction?: string;

  @ApiProperty({ description: "ID du DCSI associé (UUID)" })
  @IsUUID()
  @IsNotEmpty({ message: "L'ID du DCSI est obligatoire." })
  dcsiId: string;
}
