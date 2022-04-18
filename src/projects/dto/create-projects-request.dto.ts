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
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly contents: string;

  @IsNotEmpty()
  @IsEnum(OnOffLine)
  readonly onOffLine: OnOffLine;

  @IsNotEmpty()
  @IsEnum(ProjectType)
  readonly type: ProjectType;

  @IsNotEmpty()
  @IsNumber()
  readonly maxPeople: number;

  @IsNotEmpty()
  readonly startDate: Date;

  @IsNotEmpty()
  readonly endDate: Date;

  @IsOptional()
  @IsString()
  readonly region: string;
}

export class CreateProjectsBodyRequestDto extends CreateProjects {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly techStack: string[];
}
