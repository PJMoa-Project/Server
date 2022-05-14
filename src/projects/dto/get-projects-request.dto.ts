import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { OnOffLine, ProjectType } from '@app/entity';
import { PageRequestDto } from '@api/shared/dto';

export class GetProjectsQueryRequestDto extends PageRequestDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly personnel?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly region?: string;

  @ApiProperty({ enum: [ProjectType], required: false })
  @IsOptional()
  @IsEnum(ProjectType)
  readonly projectType?: ProjectType;

  @ApiProperty({ enum: [OnOffLine], required: false })
  @IsOptional()
  @IsEnum(OnOffLine)
  readonly onOffLine?: OnOffLine;
}
