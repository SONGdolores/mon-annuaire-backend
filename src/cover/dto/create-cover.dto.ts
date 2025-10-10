import { ApiProperty } from '@nestjs/swagger';

export class CreateCoverDto {
    @ApiProperty({type: 'string', format: 'binary', description: 'Fichier image de la cover'})
    file: any;

    @ApiProperty({type: 'string',description: "ID de l'administration liée",})
    administrationId: string;
}
