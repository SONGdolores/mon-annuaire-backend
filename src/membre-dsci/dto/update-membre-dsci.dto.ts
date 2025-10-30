import { PartialType } from '@nestjs/swagger';
import { CreateMembreDsciDto } from './create-membre-dsci.dto';

export class UpdateMembreDsciDto extends PartialType(CreateMembreDsciDto) {}


