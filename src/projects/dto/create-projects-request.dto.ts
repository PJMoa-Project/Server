import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { OnOffLine, ProjectType } from '@app/entity';

export class CreateProjectsRequestDto {
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
  @IsDate()
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  readonly endDate: Date;

  @IsNotEmpty()
  @IsArray()
  @IsString()
  @ValidateNested({ each: true })
  readonly techStack: string[];
}
