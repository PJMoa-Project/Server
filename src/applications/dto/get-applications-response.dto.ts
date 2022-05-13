import { ApiProperty } from '@nestjs/swagger';

import { ApplicationStatus } from '@app/entity';

export class GetApplications {
  @ApiProperty()
  readonly applicationId: number;

  @ApiProperty()
  readonly projectId: number;

  @ApiProperty({ enum: [ApplicationStatus] })
  readonly applicationStatus: ApplicationStatus;

  @ApiProperty()
  readonly projectTitle: string;

  @ApiProperty()
  readonly reason: string;
}

export class GetApplicationsResponseDto {
  @ApiProperty({ type: [GetApplications] })
  readonly applications: GetApplications[] | null;

  constructor(partial: Partial<GetApplicationsResponseDto>) {
    Object.assign(this, partial);
  }
}
