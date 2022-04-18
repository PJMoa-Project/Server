import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class ApplyProjectsParticipationRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly projectId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly reason: string;
}
