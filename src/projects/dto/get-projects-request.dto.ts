import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { OnOffLine, ProjectType } from '@app/entity';

export class GetProjectsQueryRequestDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly personnel?: number;

  @IsOptional()
  @IsString()
  readonly region?: string;

  @IsOptional()
  @IsEnum(ProjectType)
  readonly projectType?: ProjectType;

  @IsOptional()
  @IsEnum(OnOffLine)
  readonly onOffLine: OnOffLine;
}
