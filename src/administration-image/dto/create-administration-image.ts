import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAdministrationImageDto {
  
  @ApiProperty({
    description: "url de limage",
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsUUID()
  administrationId: string;
}

