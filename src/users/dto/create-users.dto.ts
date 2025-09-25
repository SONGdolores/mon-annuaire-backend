import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  IsString, IsUUID } from "class-validator";

export class CreateUsersDto {
  @ApiProperty({
    description: "le nom de l'utilisateur",
    type: String,
  })
  @IsString()
  @IsNotEmpty({
    message: 'le login ne doit pas etre vide'
  })
  login: string;

  @ApiProperty({ 
    description: 'MotDePasseFort' ,
    type: String,})
  @IsString()
  @IsNotEmpty()
  mot_de_passe: string;

  @ApiProperty({ 
    description: 'ID du rôle (UUID)' })
  @IsUUID()
  roleId: string;
}

