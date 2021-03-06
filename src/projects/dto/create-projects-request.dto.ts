import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

import { OnOffLine, ProjectType } from '@app/entity';
import { PROJECT_MAX_PEOPLE } from '@app/constants';

export class CreateProjects {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly contents: string;

  @ApiProperty({ enum: [OnOffLine] })
  @IsNotEmpty()
  @IsEnum(OnOffLine)
  readonly onOffLine: OnOffLine;

  @ApiProperty({ enum: [ProjectType] })
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
  @IsNotEmpty()
  @IsString()
  readonly startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly endDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly region?: string;
}

export class CreateProjectsBodyRequestDto extends CreateProjects {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly techStack: string[];
}
