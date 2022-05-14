import { ApiProperty } from '@nestjs/swagger';

import { ApplicationStatus } from '@app/entity';

export class GetApplications {
  @ApiProperty()
  readonly applicationId: number;

  @ApiProperty({ enum: [ApplicationStatus] })
  readonly applicationStatus: ApplicationStatus;

  @ApiProperty()
  readonly reason: string;

  @ApiProperty()
  readonly projectId: number;

  @ApiProperty()
  readonly projectTitle: string;
}

export class GetApplicationsResponseDto {
  @ApiProperty({ type: [GetApplications] })
  readonly applications: GetApplications[] | null;

  constructor(partial: Partial<GetApplicationsResponseDto>) {
    Object.assign(this, partial);
  }
}
