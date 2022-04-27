import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteTechStacksParamRequestDto {
  @Type(() => Number)
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly techStackId: number;
}
