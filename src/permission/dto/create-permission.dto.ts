import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePermissionDto {
  @ApiProperty({
    description: "le nom de la permission",
    type: String,
  })
  @IsString()
  @IsNotEmpty({
    message: 'le nom ne doit pas etre vide'
  })
  nom: string;

  @ApiProperty({
    description: "description de la permission",
    type: String,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
