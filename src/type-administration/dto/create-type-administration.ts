import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  IsString} from "class-validator";

export class CreateTypeAdministrationDto {
  @ApiProperty({ 
    description: "le type de structure doit etre renseigné",
    type: String,
  })
  @IsString()
  @IsNotEmpty({
    message: 'le libellé ne doit pas etre vide'
  })
   libelle: string;
  
}