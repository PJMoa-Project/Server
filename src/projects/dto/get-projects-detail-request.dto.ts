import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProjectsDetailParamRequestDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  readonly projectId: number;
}
