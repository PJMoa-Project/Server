import { ApiProperty } from '@nestjs/swagger';

import { ApplicationStatus } from '@app/entity';

class GetApplications {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly reason: string;

  @ApiProperty({ enum: [ApplicationStatus] })
  readonly status: ApplicationStatus;
}

class GetApplicationUsers {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly gitUrl: string;
}

class GetProjectsApplications {
  @ApiProperty({ type: GetApplications })
  readonly applications: GetApplications;

  @ApiProperty({ type: GetApplicationUsers })
  readonly users: GetApplicationUsers;
}

export class GetProjectsApplicationsResponseDto {
  @ApiProperty({ type: [GetProjectsApplications] })
  readonly data: GetProjectsApplications[];
}
