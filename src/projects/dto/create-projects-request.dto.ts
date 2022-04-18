import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsOptional,
} from 'class-validator';

import { OnOffLine, ProjectType } from '@app/entity';

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
  readonly maxPeople: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly endDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly region?: string;
}

export class CreateProjectsBodyRequestDto extends CreateProjects {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly techStack: string[];
}
