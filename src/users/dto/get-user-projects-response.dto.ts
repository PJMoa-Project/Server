import { ApiProperty } from '@nestjs/swagger';

export class GetUserProjects {
  @ApiProperty()
  readonly projectId: number;

  @ApiProperty()
  readonly projectTitle: string;

  @ApiProperty()
  readonly startDate: Date;

  @ApiProperty()
  readonly endDate: Date;

  @ApiProperty()
  readonly isProjectOwner: boolean;
}

export class GetUserProjectsResponseDto {
  @ApiProperty({ type: [GetUserProjects], nullable: true })
  readonly userProjects: GetUserProjects[] | null;

  constructor(partial: Partial<GetUserProjectsResponseDto>) {
    Object.assign(this, partial);
  }
}
