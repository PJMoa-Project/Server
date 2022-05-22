import { ApiProperty } from '@nestjs/swagger';

import { ApplicationStatus } from '@app/entity';

class GetApplication {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly reason: string;

  @ApiProperty({ enum: [ApplicationStatus] })
  readonly status: ApplicationStatus;
}

class GetApplicationUser {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly gitUrl: string;
}

export class GetProjectsApplications {
  @ApiProperty({ type: GetApplication })
  readonly applications: GetApplication;

  @ApiProperty({ type: GetApplicationUser })
  readonly users: GetApplicationUser;
}

export class GetProjectsApplicationsResponseDto {
  @ApiProperty({ type: [GetProjectsApplications] })
  readonly data: GetProjectsApplications[] | null;

  constructor(partial: Partial<GetProjectsApplicationsResponseDto>) {
    Object.assign(this, partial);
  }
}
