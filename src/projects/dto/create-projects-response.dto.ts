import { ApiProperty } from '@nestjs/swagger';

import { OnOffLine, ProjectType } from '@app/entity';

export class CreateProjectsResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly status: boolean;

  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly contents: string;

  @ApiProperty({ enum: [OnOffLine] })
  readonly onOffLine: OnOffLine;

  @ApiProperty({ enum: [ProjectType] })
  readonly type: ProjectType;

  @ApiProperty()
  readonly maxPeople: number;

  @ApiProperty()
  readonly region?: string;

  @ApiProperty()
  readonly startDate: Date;

  @ApiProperty()
  readonly endDate: Date;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(partial: Partial<CreateProjectsResponseDto>) {
    Object.assign(this, partial);
  }
}
