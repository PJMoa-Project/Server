import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  Min,
  Max,
  IsOptional, IsArray
} from "class-validator";
import { Type } from 'class-transformer';

import { OnOffLine, ProjectType } from '@app/entity';
import { PROJECT_MAX_PEOPLE } from '@app/constants';

export class UpdateProjectsBodyRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly contents: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(OnOffLine)
  readonly onOffLine: OnOffLine;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ProjectType)
  readonly type: ProjectType;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(PROJECT_MAX_PEOPLE)
  readonly maxPeople: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly region?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly techStack: string[];
}

export class UpdateProjectsParamRequestDto {
  @Type(() => Number)
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly projectId: number;
}
