import { ApiProperty } from '@nestjs/swagger';

import { OnOffLine, ProjectType } from '@app/entity';

export class GetProjects {
  @ApiProperty()
  readonly projectId: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly projectType: ProjectType;

  @ApiProperty()
  readonly onOffLine: OnOffLine;

  @ApiProperty()
  readonly region: string | null;

  @ApiProperty()
  readonly memberCount: number;

  @ApiProperty()
  readonly maxPeople: number;

  @ApiProperty()
  readonly startDate: Date;

  @ApiProperty()
  readonly endDate: Date;
}

export class GetProjectsResponseDto {
  @ApiProperty({ type: [GetProjects] })
  readonly projects: GetProjects[] | null;

  @ApiProperty()
  readonly projectCount: number;

  constructor(partial: Partial<GetProjectsResponseDto>) {
    Object.assign(this, partial);
  }
}
