import { PartialType } from '@nestjs/swagger';
import { CreateDcsiDto } from './create-dcsi.dto';

export class UpdateDcsiDto extends PartialType(CreateDcsiDto) {}

