import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetProjectsApplicationsParamRequestDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  readonly projectId: number;
}
