import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ParticipationStatus } from '@app/entity';

export class ApplyProjectsParticipationRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly projectId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty({ enum: [ParticipationStatus] })
  @IsNotEmpty()
  @IsEnum(ParticipationStatus)
  readonly participationStatus: ParticipationStatus;
}
