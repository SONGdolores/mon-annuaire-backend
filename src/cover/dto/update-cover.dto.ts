import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCoverDto } from './create-cover.dto';

export class UpdateCoverDto extends PartialType(CreateCoverDto) {

    @ApiProperty({ type: 'string', format: 'binary', description: 'Fichier image de la cover' })
    file: any;

    @ApiProperty({ type: 'string', description: "ID de l'administration liée", })
    administrationId: string;

}
