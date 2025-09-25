import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: " nom utilisateur", type: String
  })
  @IsNotEmpty()
  login: string;


  @ApiProperty({
    description: " mot de passe", type: String
  })
  @IsNotEmpty()
  mot_de_passe: string;
}
