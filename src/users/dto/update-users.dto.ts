import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateUsersDto {
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
        description: 'ID du rôle (UUID)' })
      @IsUUID()
      roleId: string;
}
