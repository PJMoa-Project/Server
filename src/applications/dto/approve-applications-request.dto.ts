import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ApproveApplicationsParamRequestDto {
  @Type(() => Number)
  @ApiProperty()
  @IsNotEmpty()
  readonly projectId: number;

  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  readonly applicationId: number;
}
